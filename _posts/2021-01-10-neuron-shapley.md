---
layout: post
title: "neuron shapley: interpretability meets game theory"
date: 2021-01-10
tags: papers interpretable-ml
refs:
  - >
    Amirata Ghorbani, James Zou. "Neuron Shapley: Discovering the ResponsibleNeurons." In <i>NeurIPS</i> 2020.
  - >
    David Bau*, Bolei Zhou*, Aditya Khosla, Aude Oliva, and Antonio Torralba. "Network Dissection: Quantifying Interpretability of Deep Visual Representations." In <i>CVPR</i> 2017.
---

In a <a href="https://sxzhang25.github.io/blog/2021/01/02/can-neurons-be-object-detectors">previous post</a> I discussed a bit of my thoughts on network dissection, primarily focusing on two papers which were the first papers I've seen propose this neuron-based framework of interpretability. A more recent paper from NeurIPS 2020 takes a different approach to this idea, one that is slightly more quantitative. The result is fascinating and also touches on some important use cases.

<!--excerpt-->

<h3>shapley values</h3>

The paper is based on something called a "Shapley value," originally defined by American mathematician, game theorist and economist <a href="https://www.nobelprize.org/prizes/economic-sciences/2012/shapley/facts/">Lloyd Shapley.</a> Suppose we have a set of rational agents playing a cooperative game. Their goal is to maximize the value $V$ of this game. At a high level, Shapley values tell us the contribution of each player towards achieving this value. This is measured by comparing the performance $V$ achieved by any sub-coalition of the $N$ players not containing $i$ and the performance of the those coalitions once $i$ joins. Alternatively, we can view the Shapley value as describing the share of reward that should be distributed to each player, based fairly on their contribution. 

More formally, if we have a set of players $N$ and a characteristic function $V : 2^N \rightarrow \mathbb{R}$, then the Shapley value of player $i$ is defined as

$$
\varphi_i(V) = \frac{1}{n} \sum_{S \subseteq N \backslash \{i\}} \frac{V(S \cup \{i\}) - V(S)}{n - 1 \choose |S|} = \sum_{S \subseteq N \backslash \{i\}} \frac{|S|!(n - |S| - 1)!}{n!} (V(S \cup \{i\}) - V(S)).
$$

Here, $n = |N|$. The characteristic function is kind of like a game strategy for all possible scenarios of who shows up to play. There are a few key properties of the Shapley value which makes it nice to work with:
- <b>Symmetry (a.k.a. "equal treatment of equals"):</b> If $$V(S \cup \{i\}) = V(S \cup \{j\})$$ for all $S \subseteq N$, then $\varphi_i(V) = \varphi_j(V)$. So if you contributed equally as another player, you should receive an equal share of the final reward as they do.
- <b>Linearity:</b> If the players play multiple coalition games with characteristic functions $V_1, \ldots, V_m$, then the Shapley values satisfy 

$$
\varphi_i(V_1 + \cdots + V_m) = \varphi_i(V_1) + \cdots + \varphi_i(V_m).
$$ 

- <b>Null players:</b> Players who don't contribute anything to the game receive a reward share of zero. That is, if $$V(S \cup \{i\}) = V(S)$$ for all $$S \subseteq N \backslash \{i\}$$, then $\varphi_i(V) = 0$. This is pretty straightforward from the definition.

The use of Shapley values as an indicator of importance in interpretability is not new. Work by <a href="https://arxiv.org/pdf/1908.08474.pdf">Sundararajan and Najmi</a> and the <a href="https://github.com/slundberg/shap">SHAP</a> package are other examples of how Shapley values are used to interpret model decisions.

<h3>adapting Shapley values for individual neurons</h3>

In the <a href="http://netdissect.csail.mit.edu/">network dissection</a> paper by Bau et al., the contribution of a neuron is measured by taking the Intersection-over-Union (IoU) of the neuron's binarized activation map and a segmentation mask of some concept in the input image. Here, Shapley values replace the IoU. The reward $V$ can be defined as any sort of metric. To find per-class important neurons, we would simply define $V$ as prediction accuracy or recall on that particular class. This shows one important tradeoff between the two methods: Shapley values are more objective and quantitative than IoUs (which depend on the performance of a pretrained segmentation network), but IoUs are more flexible in that they can be applied to any concept in the segmentation dataset (not just those classes which are being predicted).

Actually computing the Shapley values is a little trickier than network dissection, especially because the number of sub-coalitions is exponential in the size of the network (which is already huge). The authors go over several methods for doing this, and ultimately introduce a "Truncated Multi Armed Bandit Shapley (TMAB-Shapley)" algorithm which computes upper and lower bounds for the Shapley values rather than the exact values. I think the implementation details here are important because a method is only as good as its ability to work efficiently and accurately, but the details of how they sample are secondary to the actual results.

<h3>finding critical neurons</h3>

The authors ran their experiments on InceptionNet and SqueezeNet models, both of which were not included in the network dissection paper. I'm wondering if this decision was related to the method itself, but I don't know enough about these two architectures and the TMAB-Shapley algorithm off the top of my head to see why it couldn't be applied to other models. Hopefully I'll have some time in the next few months to run some experiments on that!

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-10-fig1.png" alt="Critical neurons in SqueezeNet trained on CelebA" style="width:100%">
  <figcaption>Figure 1. This figure in the supplementary shows examples from CelebA that certain neurons in SqueezeNet respond to the most and the least. The first and third row show a filter that discriminates between dark and light images.</figcaption>
</figure>

There actually weren't any direct comparisons made with network dissection in this paper, which I found a little surprising. That being said, the results in this paper mostly confirm those of Bau et al. Namely, for both overall network performance and per-class performance, there are a relatively small number of neurons which contribute most, and the remaining neurons are somewhat insignificant.<a href="#footnote1"><sup>1</sup></a> Neurons in earlier layers also tended to encode simpler concepts, like colors and textures, than neurons in deeper layers. This finding was also included in the network dissection paper. Figure 1 shows examples of images which neurons prefer them most and the least, and also includes a comparison with DeepDream visualizations. I like this comparison because it shows that there is still a gap between optimization and interpretability---we can clearly figure out from the image examples what the neuron is responding to, but that's not necessarily the case with the DeepDream visualizations, even though those are specifically optimized to maximally activate the neuron response.

<h3>neurons as a source of bias</h3>

A really interesting application of this neuron-based analysis is with respect to bias mitigation and model fairness. I had never thought to attribute model bias to the contributions of <i>individual neurons</i>, but the paper states that zeroing out neurons with the most negative Shapley values in a model trained on the CelebA dataset helped decrease bias. Specifically, the gender classification accuracy improved significantly for Black Females, a demographic on which models are notoriously poor at identifying accurately. At the same time, model performance on White Females improved as well. The supplement also visualizes some neurons which clearly respond most positively to light images (mostly white faces, sometimes a lighter background) and negatively to dark images (mostly black faces, occasionally images with low-exposure or harsh shadows), but they didn't specify whether these were the neurons which were causing problems. Overall, this application to diagonosis, correction and fairness is one of the most significant results in my opinion, and I actually wish there was a little more done in this direction.

<h3>other thoughts</h3>

I'm really interested in seeing if network dissection and neuron Shapley identify the same neurons for various concepts. If they do, that really strengthens this idea that neurons are important representative units of information, to a degree. More importantly, it raises the very curious question of <i>why</i> and <i>how</i> this occurs. What exactly about gradient descent and the structure of these models makes this configuration preferable? And how can we use this information to improve training?

<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>This idea is also supported strongly by empirical results in pruned models, which can retain high performance even when more than half of the weights have been pruned.</section>
</div>
