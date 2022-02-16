---
layout: post
title: "graph attention networks"
date: 2020-05-27
tags: papers graph-networks
refs:
  - >
    C. Zhang, G. Lin, F. Liu, J. Guo, Q. Wu and R. Yao, "Pyramid Graph Networks With Connection Attentions for Region-Based One-Shot Semantic Segmentation," <i>2019 IEEE/CVF International Conference on Computer Vision (ICCV)</i>, Seoul, Korea (South), 2019, pp. 9586-9594, doi: 10.1109/ICCV.2019.00968.
  - >
    Veličković, Petar, et al. "Graph attention networks." <i>arXiv preprint arXiv:1710.10903</i> (2017).
  - >
    Joan Bruna, Wojciech Zaremba, Arthur Szlam, and Yann LeCun. Spectral networks and deep locally connected networks on graphs. In <i>Proceedings of the 2nd International Conference on Learning Representations</i>, 2013.
---

Graphical models are one of the most interesting classes of models, but I've always had to read through literature about them slowly and carefully, because there is often a little more mathematical background associated with these architectures. Recently, I've been looking at some graphical approaches to image segmentation, which is a topic we briefly touched upon in the <a href="http://mlg.eng.cam.ac.uk/zoubin/talks/lect2gm.pdf">graphical models and belief propagation</a> module of a computer vision class I took this past semester.<a href="#footnote1"><sup>1</sup></a> I've looked at some classical graphical models in class and in other papers, so maybe I'll write a bit on those at a later time. This week, I came across a neat paper on graph attention networks (GATs) while tracing through the references of <a href="http://openaccess.thecvf.com/content_ICCV_2019/papers/Zhang_Pyramid_Graph_Networks_With_Connection_Attentions_for_Region-Based_One-Shot_Semantic_ICCV_2019_paper.pdf">another paper on one-shot image segmentation.</a>

<!--excerpt-->

<h3>background</h3>

Data often exhibit internal dependencies and relationships which encode crucial information about the underlying structure of the data. Graphs provide highly flexible structures for representing these relationships, while being relatively simple to construct: a graph $$G$$ is defined by $$(V,E)$$, where $$V$$ is the set of vertices (also called "nodes") of the graph representing the data samples, and $$E$$ is the set of edges of the graph representing the existence of relationships between vertices. These edges can be unweighted or weighted, meaning they have a numerical value associated with them. An edge between vertices $$i$$ and $$j$$ is denoted by $$e_{ij}$$. A vertex $$u$$ is adjacent to a vertex $$v$$ if $$e_{uv} \in E$$, i.e. there exists an edge between $$u$$ and $$v$$. The <i>neighborhood</i> of a vertex, denoted by $$\mathcal{N}(v)$$, is defined as the set of vertices which are adjacent to $$v$$. In general, graphs in computer science are <i>simple</i>, meaning they have no loops or parallel edges, so the <i>degree</i> of a vertex can be defined either as the size of the neighborhood (unweighted graphs) or the sum of all the weights of the edges leaving the vertex (weighted graphs).

The paper is <i><a href="https://arxiv.org/pdf/1710.10903.pdf">Graph Attention Networks</a></i> by Petar Veli&#269;kovi&#263; et al. and the authors also <a href="https://petar-v.com/GAT/">have a webpage for the project.</a> The underlying motivation of these graphical network architectures is to generalize the convolution function that has become such a powerful operation in CNN layers. Indeed, any image or grid-structure is essentially a graph with a highly specified structure, and nodes in such graphs usually have eight neighbors (depending on how the edges are padded). A graph convolution extends the convolution on an image grid to an arbitrarily structured graph: each node is associated with a set of features, and the convolution at a certain node should be a sort of weighted sum of the features of its neighbors, perhaps after some learnable linear operation is applied to each feature. The project webpage has pretty clear formal definitions and notations and gives a nice rundown of the desirable features in a general graph convolution, so I'll refrain from reciting the information in too much detail.

<h3>the GAT structure</h3>

A basic single graph attention layer can involve multible <i>attention heads</i>, which are composed of some variant of the following <i>self-attention</i> process:
<ol>
<li>a learnable set of weights \(W\) acts on the features of nodes as a linear transformation;</li>
<li>nonlinearity is applied;</li>
<li><i>attention coefficients</i>, which are essentially edge weights, are computed from the transformed features and normalized;</li>
<li>a convolution-esque process is applied to each \(v\) using the edge weights of the edges leaving \(v\) and the neighborhood \(\mathcal{N}(v)\).</li>
</ol>

Steps (1) through (3) are be done once for each edge and each node before any convolutions are applied. The entire process can be done multiple times with multiple attention heads per layer, and the final feature vectors are concatenated (in a hidden layer) or averaged (in the output layer). For a much more detailed and thorough exposition, refer to Section 2.1 and of [2].

Since the convolutions are defined using the input features at each node and the pre-computed normalized attention coefficients, this convolution is suitable for handling variable neighborhood sizes.

<h3>transductive vs. inductive learning</h3>
Another one of the main benefits of GATs is the fact that the network can be used on previously unseen graphs. That is, the model is capable of both <a href="https://arxiv.org/pdf/1301.7375.pdf"><i>transductive</i> and <i>inductive</i> learning.</a> It's not explicitly mentioned why inductive learning is harder for such graphical methods, but my hunch is that some previous techniques computed edge weights or coefficients in the convolution using information about the overall structure of the specific graph being examined. Spectral methods, for example, can depend highly on the structure of the graph being examined. Consequently, these methods may not generalize well to new unseen graphs. For example, a typical spectral approach examines the eigenvectors of the <a href="https://bit.ly/3gsTyxP">graph Laplacian</a>, but we may only want to consider the first $$d$$ eigenvectors (there are <a href="https://www.math.ucdavis.edu/~saito/data/graphlap/merris-graphlap-eigvecs.pdf">infinitely many eigenvectors and eigenvalues,</a> so we surely cannot consider them all). However, an appropriate value of $$d$$ depends on the graph structure. Graphs with little regularity and many complexities may require larger $$d$$ to sufficiently represent the underlying graph geometry, whereas a graph like a grid would not require a large $$d$$ to capture structural information. In [3], the number of trainable parameters depends on $$d$$, so prior knowledge about the graph structure plays a significant role. We could just choose a large value of $$d$$ and hope it covers a large range of complexities in graph structure, but this would be computationally wasteful.

To test transductive learning, the authors used three different citation datasets: (1) <a href="https://relational.fit.cvut.cz/dataset/CORA">CORA</a>, (2) <a href="https://csxstatic.ist.psu.edu/downloads/data">Citeseer</a>, and (3) <a href="https://www.nlm.nih.gov/databases/download/pubmed_medline.html">Pubmed</a>. Inductive learning was tested on a <a href="http://snap.stanford.edu/ohmnet/">protein-protein interaction (PPI)</a> dataset.

<h3>so how do these models do?</h3>
The GAT performs at least as well as many other models on the transductive tasks, but it's the performance margins in the inductive setting that are really quite remarkable. On the PPI dataset, the GAT achieved a 20.5% improvement over the previous graphical model benchmark. Of course, there was limited comparable previous work done for the inductive task on this particular dataset. But as the authors note, this really shows just how expressive graphs are and how important it is to utilize the information they hold. Moreover, from looking at paper titles I get the sense that there are currently two ends of the spectrum in graphical methods: spectral approaches and deep learning approaches. I spent a lot of time working with graph Laplacians in the last few months (although for an entirely different application), so it was interesting to see where the weaknesses of such spectral approaches lie in certain problems.

Looking through the citations of the [2], I managed to find an incredibly diverse space of GAT appearances. Among some of the vision-related applications were <a href="https://openreview.net/forum?id=rkKvBAiiz">medical image segmentation,</a> <a href="https://dl.acm.org/doi/abs/10.1145/3326362">3D shape analysis</a> and <a href="http://openaccess.thecvf.com/content_ECCV_2018/html/Jianwei_Yang_Graph_R-CNN_for_ECCV_2018_paper.html">scene graph generation.</a> One <i>extremely</i> interesting application I discovered was actually the use of GATs for  routing problems (a subset of combinatorial optimization problems), <a href="https://arxiv.org/pdf/1803.08475.pdf">such as the infamous Traveling Salesman Problem (TSP).</a><a href="#footnote2"><sup>2</sup></a> Although neural network approaches to these types of problems <a href="http://genomics.princeton.edu/tank/pdf-publications/neural%20computation%20of%20decisions%20in%20optimization,%20Hopfiedl%20&%20Tank.pdf">have been around since the 1980s,</a> I wasn't aware that neural network approaches to combinatorial optimization problems were an active area of research. Importantly, the TSP, while independently famous, is also <a href="https://www8.cs.umu.se/kurser/TDBAfl/VT06/algorithms/BOOK/BOOK3/NODE107.HTM">a reduction of the iconic Hamiltonian Cycle problem</a> in graph theory.

<h3>other thoughts</h3>
Despite being more technical in background than some other papers I've read, the GAT paper was actually a relatively straightforward read. The authors gave a really good balance of mathematical notation and verbal description, and the writing was concise enough that nothing looked dense, while also detailing the perfect amount of information for me to get a solid understanding. I think I want to keep this paper in mind as a reference for writing future technical reports.

Originally, I planned on reading more papers related to object recognition and few-shot recognition this week---GATs came up only because they were an unfamiliar term in a paper on one-shot recognition using image segmentation [1]. But in the process of working through [2], I realized that the space of graphical models is actually way deeper than I thought, and I sort of want to explore it more in depth. So, in the coming weeks I'm going to shift focus a little and dive more into other graphical models and their applications.

<h3>updates</h3>
<ul>
  <li>5/28/2020: attended a tutorial session on non-local operators, of which a specific instance are self-attention mechanisms. A neat little coincidence that definitely made me appreciate this a little more.</li>
</ul>

<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>I wasn't taught from the linked slides, but I found them to be a nice quick reference and refresher. Sometimes slides can be sparse and unhelpful without the lecturer, but these were pretty thorough.</section>

<section id="footnote2"><sup>2</sup>I haven't read all of the paper on using GATs for TSP in depth, but I am definitely going to put it on a future reads list---not only does it seem like such a happy intersection of deep learning and math, but the style of writing in the paper is also really unique and refreshing.</section>
</div>
