---
layout: post
title: "text-to-image synthesis, part 1: learning to draw"
date: 2020-10-10
tags: papers text-to-image computer-vision
refs:
  - >
    Gregor, K., Danihelka, I., Graves, A., Rezende, D., and Wierstra, D. "Draw: A recurrent neural network for image generation." In <i>ICML</i>, 2015.
  - >
    Zhang, Han, et al. "Stackgan: Text to photo-realistic image synthesis with stacked generative adversarial networks." <i>Proceedings of the IEEE International Conference on Computer Vision.</i> 2017.
---

As I mentioned in <a href="https://sxzhang25.github.io/blog/2020/08/26/text-to-image-synthesis-0">my previous post</a> introducing the text-to-image (T2I) synthesis task, there are two main parts to this task: (1) producing a suitable encoding of the text input and (2) creating a plausible image from the text encoding. You might also add in a third part, which is defining exactly how the information in the text encoding should be used in the image generation, but I feel like this is a more open-ended challenge that deserves its own discussion. In this post, I want to focus independently on an interpretation of the second task.

<!--excerpt-->

<h3>drawing pictures vs. generating images</h3>

Before I became interested in the T2I task, I had originally set out to find papers that might help me understand what it would take to train a model to produce drawings of a word or phrase (like you would do in a game of Pictionary). As I was looking through the references in few different T2I papers, I noticed that many of them cited this paper called <a href="https://arxiv.org/pdf/1502.04623.pdf">DRAW: A Recurrent Neural Network for Image Generation</a> by researchers at Google DeepMind. The first few sentences of the paper read,

<blockquote>
<div class="long-quote">
  "A person asked to draw, paint or otherwise recreate a visual scene will naturally do so in a sequential, iterative fashion, reassessing their handiwork after each modification. Rough outlines are gradually replaced by precise forms, lines are sharpened, darkened or erased, shapes are altered, and the final picture emerges. Most approaches to automatic image generation, however, aim to generate entire scenes at once."
</div>
</blockquote>

Typical image generation using GANs is indeed very different from how humans draw. Take a look, for example, at the gradual formation of MNIST digits by a relatively simple GAN in Figure 1. There is no organization given to how the digits are molded; rather, the entire image gradually converges to a digit-like figure. In contrast, most people create pictures in a highly structured manner, organizing scenes by objects, objects by parts, and parts by anatomy. The process described by the researchers above is true as well, especially in classical painting: artists begin with a sketch or underpainting that roughly outlines the scenes, then they go in and render rough values, and after that comes subsequent iterations of refinement and detailing. Within each of these broad steps, the artist will move along in the aforementioned organized fashion.

However, approaching image generation from the perspective of a human artist gives rise to a new problem: how can we train a machine to focus sequentially on different parts of an image?

<h3>differentiable attention</h3>

These days, attention is a widely used concept in computer vision and natural language processing tasks.<a href="#footnote1"><sup>1</sup></a> There are also many manifestations and representations of attention within machine learning, although they all aim to capture the same idea of <i>weight</i>. That is, how much weight should a particular computation have in a model? The most fundamental way of computing this is to simply assign a scalar weight to each component in the input, and calculate a weighted sum of all the components. The components with the largest weight will have a larger influence on the value of the sum, whereas the components who have weights close to zero will be effectively ignored.<a href="#footnote2"><sup>2</sup></a>

In the paper, the authors propose a completely differentiable two-dimensional attention mechanism in the form of a grid of 2D Gaussian filters. The overall structure is similar to a kernel of Gaussian kernels: each $$N \times N$$ grid is specified by the coordinates $(g_X, g_Y)$ of the center of the grid (the center pixel of the center filter in the grid), the stride distance $\delta$ between the centers of filters in the grid, the shared isotropic variance $\sigma^2$ of the Gaussian filters and an intensity parameter $\gamma$ which scales the filter responses. A single filter in the filterbank actually spans the entire image (though the response can be computed in linear time by using separated 1D Gaussian filters), so the resulting response is an $N \times N$ pixel image patch.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2020-10-10-fig1.gif" alt="Two-dimensional attention via a grid of Gaussian filters" style="width:30%">
  <figcaption>Figure 1. A $3 \times 3$ grid of Gaussian filters applied to an image and their center positions. Each of the nine filters actually covers the whole image, but here $\sigma$ is small enough so that most of the weights are effectively zero.</figcaption>
</figure>

Each of the parameters mentioned above is trainable, and essentially describes where the model learns to focus its attention, and how intense that attention is. In particular, if both $\delta$ and $\sigma$ are large, then the effect is a "big-picture" attention that sees a large portion of the image at a low resolution. Conversely, when $\delta$ and $\sigma$ are both small, then the effect is a highly focused attention on one particular patch in the overall image. When $\gamma$ is large, we enhance our attention, and when $\gamma$ is small, we suppress our attention. This attention is also used in two different places, during the drawing phase and during the looking phase. The paper refers to these as the "write" and "read" operations, respectively. To actually apply the attention filters, we can simply use matrix multiplication.

<h3>the DRAW architecture</h3>

The DRAW architecture has elements of both an RNN and a VAE. Specifically, the RNN keeps track of two hidden states, one corresponding to an image encoder and the other corresponding to an image decoder. Intuitively, the network makes iterative edits to its canvas that grow more detailed over time, and at the same time learns how to encode meaningful latent representations of the images that inform how different objects should be drawn.

During training time $$t$$, the model examines the discrepancies between its current drawing and the ground truth image by computing the pixel wise difference $$\hat{x}_t$$ between the two. This is called the "error image." A read operation is performed using $$\hat{x}_t$$, the ground truth image $$x$$ and the previous hidden state $$h^{dec}_{t-1}$$ of the decoder. The hidden state of the encoder is then updated with the previous hidden states of both the encoder and decoder, as well as the result of the read operation. Next, a latent vector $$z_t$$ is sampled from the latent distribution $$Q(Z_t \mid h^{enc}_t)$$, where the latent distribution is modeled as a diagonal Gaussian $$\mathcal{N}(Z_t \mid \mu_t, \sigma_t)$$ and

$$
\mu_t = W(h^{enc}_t), \quad \sigma_t = W(h^{enc}_t).
$$

The new hidden state $$h^{dec}_t$$ of the decoder is computed using the previous hidden state of the decoder and the latent vector. Finally, the canvas $$c_t$$ is modified by adding $$write(h^{dec}_t)$$ to the previous state of the canvas $$c_{t-1}$$. This is a rather cute training algorithm in my opinion, because it has a quite interpretable artistic parallel. If you think about it, after each modification an artist makes to a painting, they look back at their source and figure out what is missing or off. This then informs where their next stroke will be. In the training algorithm, we can see this idea manifested by the dependency of the $write$ operation on the hidden state of the decoder, which depends on the hidden state of the encoder, which ultimately depends on the $read$ operation that takes the error image as an input.

<h3>experimental results</h3>

The authors ran various experiments on the MNIST, SVHN and CIFAR10 datasets. Diagrams of the progression of the canvas over time on MNIST show how strikingly similar the network behaves to actual writing---unlike most generative models which develop the entire image in tandem, the DRAW model actually writes out the digits like a person writing with a pen (Figure 1 in the paper). Interestingly, the digits still exhibited that "blurry" softness that is a trademark of most VAEs. The progression on SVHN similarly demonstrated a degree of attention by forming numerical digits one at a time, although it didn't explicitly "write" them out (Figure 10 in the paper). On CIFAR10, however, the images were largely uninterpretable, and exhibited an even greater degree of the classic VAE blur (Figure 12 in the paper). This is to be expected, given the diversity of CIFAR images compared to MNIST digits.

Despite the shortcomings of this model on more complicated image datasets, this fundamental idea of iterative refinements has come up in many subsequent papers. Most notably, the <a href="https://arxiv.org/pdf/1612.03242">StackGAN</a> model used for text-to-image synthesis generates images of increasing resolution by stacking GANs on top of each other, so that subsequent GANs have a roughly rendered image to start out with. On fine-grained datasets like CUB-200 and Oxford Flowers 102, the final high-resolution images are much more realistic and detailed.

<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>An "X is All You Need" paper was written <a href="https://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf">about attention.</a> It's been cited over 12,500 times.</section>

<section id="footnote2"><sup>2</sup>I wrote a <a href="https://sxzhang25.github.io/blog/2020/05/27/graph-attention-networks">previous blog post</a> on a paper which also generalized this idea to graph convolutions.</section>
</div>
