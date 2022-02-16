---
layout: post
title: "are triplets better than twins?"
date: 2020-08-05
tags: papers neural-networks experiments
refs:
  - >
    Hoffer, Elad, and Nir Ailon. "Deep metric learning using triplet network." <i>International Workshop on Similarity-Based Pattern Recognition.</i> Springer, Cham, 2015.
  - >
    Lake, Brenden M., Ruslan Salakhutdinov, and Joshua B. Tenenbaum. "Human-level concept learning through probabilistic program induction." <i>Science</i> 350.6266 (2015): 1332-1338.

---

I started writing this over a month ago, but work and life got in the way and so I'm coming back to this just over a month later. I've been experimenting with some networks (spread out over the past few weeks) after coming across a paper on <i>triplet networks</i> from the International Conference on Learning Representations (ICLR) 2015. Unfortunately, it turns out that I still need to work on my TensorFlow skills a little, so I haven't gotten the chance to clean up my results yet. I figured I might as well record my thoughts on the paper first, and update this later when I finish running my code.

<!--excerpt-->

<h3>what is a triplet network?</h3>

The paper is called <a href="https://arxiv.org/pdf/1412.6622.pdf"><i>Deep Metric Learning Using Triplet Network</i></a> by Elad Hoffer and Nir Ailon, and it essentially extends the concept of a twin (Siamese) neural network. I investigated twin neural networks in a project this past spring semester, so I really wanted to see how a triplet network took the ideas of twin networks further.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2020-08-05-fig1.png" alt="Triplet network architecture" style="width:100%">
  <figcaption>Figure 1. The architecture of a triplet network.</figcaption>
</figure>

The idea of a triplet network is to essentially create a CNN which is trained to act as a comparator for similarity. Given an input, the CNN represents the image as an $$n$$-dimensional embedding that lives in a "similarity space" in which Euclidean L2 distance is a direct metric of similarity between embeddings. In a twin neural network, the CNN performs an analogous role, but is not trained with "positive" or "negative" examples. In the words of the authors, "Siamese networks are also sensitive to calibration in the sense that the notion of similarity vs. dissimilarity requires context." The training process for a triplet network addresses this context by introducing a <i>contrastive loss</i>, which compares the distance between an anchor and a positive example and the distance between the same anchor with a negative example.

<h3>the experiment</h3>

My goal is to compare (roughly) the performance of a basic, stripped-down triplet network with a twin network on the few-shot classification task. I stuck with the <a href="https://github.com/brendenlake/omniglot">Omniglot dataset</a> that I used in my report on twin networks, and implemented everything using Keras. For both networks, I built the classification network on top of a CNN with three convolutional layers. The comparison will likely be rough because training these networks to complete convergence is going to take more time than I want to spend on this quick endeavor, so for the sake of time and resources I'll aim for 20 epochs on the twin network and 30 epochs on the triplet network. To visualize if and how the embeddings are semantically oriented in their respective similarity space, I'm going to project the embeddings of all the training images in the Bengali alphabet into two dimensions using PCA and labeled them according to class. A tSNE comparison might also be neat. Ideally, there will be distinct (but not perfectly separated) clusters corresponding to different character labels. Of course, two-dimensional PCA should always be taken with a grain of salt, as per the discussion in <a href="https://sxzhang25.github.io/blog/2020/06/22/a-brief-account-of-cvpr-2020">my last blog post</a> about Prof. Boutin’s keynote on high-dimensional data.

I also want to do some experiments with transferring the knowledge that the respective twin and triplet CNN embedding networks learn. I think it would interesting to see how the similarity networks for each architecture perform when joined to the opposite network's CNN base. Since both similarity networks are based on the same concept of "comparibility," but framed in slightly different contexts, the results of this might point to strengths in one model over another. For example, if the twin model's similarity network manages to perform well using both the twin CNN and the triplet CNN, then perhaps the triplet similarity network is more broadly capable of capturing similarities. This is what I'm hypothesizing, since the comparator concept of the triplet similarity network seems to be more robust than the pairwise similarity score that the twin similarity network computes. If they both decrease in performance, then there wouldn't be evidence to support this idea.

<h3>where I still need to improve</h3>

I've been doing most of my code in Keras in a function-centric setup as opposed to an object oriented approach. Given the mixing test that I want to perform on the two components in each network, I'm probably going to switch over to an object oriented organization of my code in the next iteration of this experiment. There's also some over-fitting issues that I need to deal with as well, but I'll be sure to update this when I get some nice visuals. I guess what I'm saying is that my answer to the title of this blog post is: I don't know (for now).

In the meantime, I've also been reading a <i>lot</i> of cool computational photography and creative technology papers, and I definitely want to dig into a few of those more as well. My internship has also been taking some exciting turns, and I've been enjoying work immensely. More to come!
