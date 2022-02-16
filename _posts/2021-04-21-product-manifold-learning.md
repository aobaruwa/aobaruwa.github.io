---
layout: post
title: "how to factorize a manifold"
date: 2021-04-21
tags: papers data-analysis statistics conferences
refs:
  - >
    Sharon Zhang, Amit Moscovich, Amit Singer. "Product Manifold Learning." In <i>AISTATS</i> 2021.
  - >
    Stefan Lafon. "Diffusion maps and geometric harmonics." PhD Dissertation, Yale University. May 2004.

  - >
    Mikhail Belkin and Partha Niyogi. "Towards a theoretical foundation for Laplacian-based manifold methods." <i>Journal of Computer and System Sciences</i>, 74 (8):1289–1308, 2008.

  - >
    Ronald R. Coifman and Stéphane Lafon. "Diffusion maps." <i>Applied and Computational Harmonic Analysis</i>, 21(1):5–30, 2006.
---

Imagine you have some sensory data of a robotic arm moving around. Given a little bit of prior info about this mechanism, we may reasonably assume that it has several joints at which the arm moves. How can we figure out what kinds of motions each of these joints exhibits? In our recent AISTATS paper, <a href=""><i>Product Manifold Learning</i></a>, we tackle this question and others like it.

<!--excerpt-->

<h3>background</h3>

A more formal way of describing the problem above is to consider our data as observations of some signal which maps latent variables $(\theta_1, \ldots, \theta_m)$ to an observable space (typically high dimension Euclidean space---think image data). If each latent variable $\theta_i$ lies on a manifold $\mathcal{M}_i$, then we can model the entire latent space as a product manifold,

$$
\mathcal{M} = \mathcal{M}_1 \times \cdots \times \mathcal{M}_m.
$$

However, even with this information we know nothing about the geometry of the individual $\mathcal{M}_i$'s, which we call <i>manifold factors.</i> Is there some way of recovering this from our data? For example, can we determine that the swiss roll structure in Figure 1 is actually just a rectangle that's been rolled up?

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-21-fig1.png" alt="Unrolling a swiss roll dataset" style="width:100%">
  <figcaption>Figure 1. One way of applying dimensionality reduction to a 3D swiss roll dataset is to "unroll" it as a rectangle.<a href="#footnote1"><sup>1</sup></a></figcaption>
</figure>

The answer is yes! But to do so, we need some theoretical results first.

<h3>the laplacian over product spaces</h3>

The main theoretical result we can leverage is the way the Laplacian operator decomposes over product spaces. Recall that the Laplacian $\Delta$ of a function $f$ over Euclidean space is defind as $\Delta f = \nabla \cdot (\nabla f)$. Here, $\nabla \cdot$ denotes the divergence operator and $\nabla f$ is the gradient of $f$. For Riemannian manifolds, there actually exists a more general version called the Laplace-Beltrami operator, but for the sake of simplicity we'll just stick with the real Laplacian here. Consider the spectrum of the Laplacian operator, i.e. the set of solutions to the Helmholtz equation

$$
\Delta_\mathcal{M} f(\mathbf{x}) = \lambda f(\mathbf{x}), \qquad \forall \mathbf{x} \in \mathcal{M}
$$

with Neumann boundary conditions

$$
\nabla_\mathcal{M} \cdot \nu(\mathbf{x}) = 0, \qquad \forall \mathbf{x} \in \partial \mathcal{M}.
$$

We call these $f(\mathbf{x})$ the Laplacian (Neumann) eigenfunctions. When $\mathcal{M}$ is a product manifold with $m$ manifold factors, we can write every $f(\mathbf{x})$ as the product

$$
f(\mathbf{x}) = \prod_{i=1}^m \bigg(f^{(i)}_{k_i} \circ \pi^{(i)} \bigg),
$$

where $\pi^{(i)} : \mathcal{M} \rightarrow \mathcal{M}_i$ is the canonical projection. More colloquially, each eigenfunction decomposes as the product of one eigenfunction from every manifold factor. In addition, we have another nice property:

$$
\lambda_{k_1, k_2, \ldots, k_m} = \sum_{i=1}^m \lambda^{(i)}_{k_i},
$$

i.e. the eigenvalue of the eigenfunction is precisely the sum of the eigenvalues of the eigenfunctions which form the product. Lastly, these eigenvalues are all nonnegative and monotonically increasing.

To illustrate with an example, consider the simplest possible product space---a rectangle, which is the product of two closed line segments. Figure 2 shows the part of the spectrum of the rectangle, broken down into a sort of infinite multiplication table of the spectrum of each line segment.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-21-fig2.gif" alt="Decomposition of the Laplacian over product spaces" style="width:100%">
  <figcaption>Figure 2. Each product eigenfunction of the rectangle is the product of an eigenfunction of the vertical line segment and an eigenfunction of the horizontal line segment.</figcaption>
</figure>

Borrowing some fundamental terminology, we call the eigenfunctions along the top row and left column "factor eigenfunctions" and the rest of the eigenfunctions "product eigenfunctions."

<h3>our method</h3>

Suppose we are just in the two manifold factor case right now, i.e. $\mathcal{M} = \mathcal{M}_1 \times \mathcal
{M}_2$. Minus some details, our factorization algorithm can be defined in three steps:

1. <b>Compute the spectrum of the Laplacian.</b> Since we don't have infinite data samples, we need to approximate the eigenfunctions. We can do so by computing $N$ eigenvectors of the graph Laplacian instead. For more information on the asymptotics of the eigenvectors, see Stefan Lafon's <a href="https://690cd646-a-62cb3a1a-s-sites.googlegroups.com/site/stefansresearchpapers/home/dissertation.pdf?attachauth=ANoY7cr1ahpFD_WRIwK_PDiIFpZAZeDlqNZjK2tkFfyybW2D2SEmtBT8NAVRJ2NeYkxlFDwccCsZyKGUFp7OLRW0RnV3LkyO1mw_CF36Pj26vBqY7wU_4Lj9BKCwnJv5heVHG4PGscqfWB7yiNpxR5-UcCuAZCW7cSUAbDluPN1A6HpHM0aZ2qYCr2drO40U2i9tx7C6i2fVMU6GcXuaabnbLQ8oXAhtKORx4PYDaAPhDgC2x7vn6-g%3D&attredirects=0">PhD dissertation</a>.

2. <b>Factorize the eigenvectors.</b> From step 1, we obtain a set of eigenvectors sorted by increasing eigenvalue. Using our result that product eigenvectors factorize into factor eigenvectors, for each eigenvector $\varphi_k$, we find the factorization $\varphi_i \times \varphi_j$ which is closest to $\varphi_k$. This “closeness” is measured by the absolute cosine similarity,<a href="#footnote2"><sup>2</sup></a>

    $$
    S(\varphi_k, \varphi_i\varphi_j) := \frac{|\langle \varphi_k , \varphi_i\varphi_j\rangle|}{||\varphi_k|| \cdot ||\varphi_i\varphi_j||}.
    $$

    This gives us a list $\mathcal{T}$ of triplets $(i,j,k)$, where each triplet contains our best approximation $\varphi_i \times \varphi_j \approx \varphi_k$.

3. <b>Group factor eigenvectors by manifold factor.</b> Define a weighted graph $H = (V, E, W)$ where $V$ is the set of unique factor eigenvectors in $\mathcal{T}$. The edge weights are given by the highest similarity score

    $$
    W_{ij} = \max_{(i,j,k) \in \mathcal{T}} S(\varphi_k, \varphi_i\varphi_j).
    $$

    Our problem now becomes one of separating the vertices into two groups, with higher priority given to separating vertices with high edge weights. Thus, this becomes formulated as a MAX-CUT problem. By using a MAX-CUT SDP solver with $H$ as the input, we can sort our factor eigenvectors into two bins that correspond to $\mathcal{M}_1$ and $\mathcal{M}_2$.

    <figure>
      <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-21-fig3.png" alt="Reformulating the problem of grouping factor eigenvectors by manifold factor as a MAX-CUT problem" style="width:60%">
      <figcaption>Figure 3. We can reformulate our problem of grouping factor eigenvectors by manifold factor as a MAX-CUT problem.</figcaption>
    </figure>

<h3>some fun results!</h3>

An interesting application of this method is in structural biology---specifically, applied to cryo-electron miscroscopy (cryo-EM) data. Cryo-EM is a microscopy technique that won <a href="https://pubmed.ncbi.nlm.nih.gov/29423601/#:~:text=The%202017%20Nobel%20Prize%20in%20Chemistry%20was%20awarded%20to%20Jacques,major%20achievements%20leading%20to%20the">the Nobel Prize in chemistry</a> and also played a role in many of the COVID-19 studies done over the past year.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-21-fig4.png" alt="Real and synthetic cryo-EM data" style="width:100%">
  <figcaption>Figure 4. Real Cryo-EM images (left) and our synthetic cryo-EM data (right). The molecule used to generate the data is soured from <a href="https://github.com/amithalevi/ASPIRE-Python/blob/master/src/aspire/volume/fakekv.py">here</a>.<a href="#footnote3"><sup>3</sup></a></figcaption>
</figure>

The main problem in cryo-EM is a reconstruction problem: given all these images, can we recover information about the 3D structure of the molecule being imaged? In particular, a macromolecule may be composed of several different independently moving subunits. If each of these subunits moves continuously, then the shape space of the entire molecule can be modeled as a product manifold!

In our experiments, we use a model of a molecule with two independently moving subunits (see Figure 4, right). The red subunit rotates freely around the z-axis (latent space = circle), and the blue subunit stretches linearly along a limited range of the x-axis (latent space = line segment). Applying our algorithm gives two eigenvector groups, shown in Figure 5. We can see that the group on the left corresponds to the spectrum of the blue subunit (eigenvectors of a line) and the group on the right corresponds to the spectrum of the red subunit (eigenvectors of a circle).

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-21-fig5.png" alt="Applying our method to cryo-EM data" style="width:100%">
  <figcaption>Figure 5. Applying our method to cryo-EM data yields two groups of factor eigenvectors which describe the eigenspaces of the red and blue subunits in the original macromolecule.</figcaption>
</figure>

So now we have eigenvector groups corresponding to each manifold factor. What's next? Well, one thing we can do is use these eigenvectors to visualize the structure of each manifold factor. To do so, we can plot a diffusion map embedding of each eigenspace. Figure 6 shows visualizations using our method compared to standard diffusion maps and linear ICA. Without the factorization, it's hard to get a good understanding of the individual structures within the data.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-21-fig6.png" alt="Product manifold geometry visualizations" style="width:100%">
  <figcaption>Figure 6. Various visualizations of the geometry of different product manifolds. Note that having the factorized eigenspace is especially useful in isolating individual structures within the data.<a href="#footnote4"><sup>4</sup></a></figcaption>
</figure>

<h3>future work</h3>

A big question for future research is what this looks like in the case of $m > 2$ manifold factors. There are at least two ways to approach this---for one, we can simply use a MAX k-CUT SDP and slightly modify how we search for factorizations and construct $H$ in steps (2) and (3). This depends mostly on the quality of the SDP. Alternatively, we can apply the $m = 2$ case <i>iteratively</i>, and keep factorizing the groups of eigenvectors that we get until we reach the correct number of manifold factors. In any case, there is definitely room for improvement here.

On a different note, I also had a great presenting at AISTATS! Unfortunately everything was virtual this year, but despite this we actually had a good amount of visitors come to our poster and engage in some nice discussions with us. It was great to experience a conference poster session for the first time (I was definitely a little nervous, even behind a screen), and I'm looking forward to more conferences in the future.

<i>This work was done in collaboration with <a href="https://mosco.github.io/">Amit Moscovich</a> and <a href="https://web.math.princeton.edu/~amits/">Amit Singer</a>.</i>

<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>Figures taken from <a href="http://www.cis.jhu.edu/~cshen/html/PublishSwissRoll.html">http://www.cis.jhu.edu/~cshen/html/PublishSwissRoll.html</a>.</section>

<section id="footnote2"><sup>2</sup>We use the absolute cosine similarity rather than the signed cosine similarity because we can't distinguish between $\varphi_i$ and $-\varphi_i$.</section>

<section id="footnote3"><sup>3</sup>Left figure taken from <a href="https://en.wikipedia.org/wiki/Cryogenic_electron_microscopy">https://en.wikipedia.org/wiki/Cryogenic_electron_microscopy</a>.</section>

<section id="footnote4"><sup>4</sup>What we call a "3D rectangle" is just a 2D rectangle observed in 3D space, with Gaussian noise added in the z-direction.</section>
</div>