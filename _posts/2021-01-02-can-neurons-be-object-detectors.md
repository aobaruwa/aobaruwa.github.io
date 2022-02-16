---
layout: post
title: "can neurons be object detectors?"
date: 2021-01-02
tags: papers interpretable-ml
refs:
  - >
    David Bau*, Bolei Zhou*, Aditya Khosla, Aude Oliva, and Antonio Torralba. "Network Dissection: Quantifying Interpretability of Deep Visual Representations." In <i>CVPR</i> 2017.
  - >
    David Bau, Jun-Yan Zhu, Hendrik Strobelt, Bolei Zhou, Joshua B. Tenenbaum, William T. Freeman, and Antonio Torralba. "GAN Dissection: Visualizing and Understanding Generative Adversarial Networks." In <i>ICLR</i> 2019.
---

It's the new year! 🎊 The last two months have been pretty busy and frankly exhausting, so I haven't been able to write quite as much as I would have liked to. Nevertheless, I've still been reading lots of cool papers. In the past semester, I messed around quite a bit with GANs and in the process, I came across a really fascinating set of papers on interpretability in visual classifiers and generative models. These papers describe a framework of interpretability dubbed "network dissection," which examines the role of individual neurons within deep networks.

<!--excerpt-->

<h3>network dissection</h3>

The two papers come from work done by <a href="https://people.csail.mit.edu/davidbau/home/">David Bau</a> and collaborators at MIT, with the <a href="https://netdissect.csail.mit.edu/final-network-dissection.pdf">CVPR 2017 one</a> focused on visual classifiers and the <a href="https://openreview.net/pdf?id=Hyg_X2C5FX">ICLR 2019 one</a> focused on extending the techniques to GANs. As described in them, network dissection aims to understand deep networks trained on visual tasks by looking at what concepts individual neurons are responding to, if any. In these CNN-based models, a neuron is essentially a set of filters that produce a single activation map in an intermediate layer. The idea is that an individual neuron may actually correspond to a particular concept---like a complex object or a simple pattern. Coincidentally, I was also taking an introductory neuroscience course while I came across this paper, and this sort of organization does appear to some degree in the human brain. In fact, there is a section of the brain in the visual cortex called the <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1857737/">Fusiform Facial Area (FFA)</a> which consists of neurons that respond selectively to faces. Other groups of biological neurons also prefer various other important objects in daily life.

That this type of object detection might emerge within the neurons of a deep network is pretty neat. But I was actually drawn to this particular set of papers because of all the follow-up questions popping into my mind as I was reading them. There's a lot of great experiments described in these papers, but I wanted to highlight a few results I found particularly interesting.

<h3>neurons do correspond to concepts</h3>

This is perhaps not so surprising, as there wouldn't be much to write about if this wasn't the case. In classifier networks, the authors found that concepts emerge in neurons in order of increasing complexity as we look into deeper layers. For instance, neurons at early layers might capture colors or textures, and neurons at deep layers might capture concepts like mountains or cats or faces. This is not so surprising either, as it is well known that the convolutional filters themselves behave this way---filters at very early layers tend to represent simple patterns and lines, whereas filters at deeper layers are much more complex. 

The phenomenon also appears in GANs. For a model trained on images of buildings, the authors found neurons that were able to control the presence or absence of trees, windows, doors and other objects in the final output image. This is demonstrated in a pretty neat <a href="http://gandissect.res.ibm.com/ganpaint.html?project=churchoutdoor&layer=layer4">GAN Paint demo app</a> that they wrote, which I had a lot of fun playing around with. Even more interestingly, though, was their discovery of several neurons which seemed to cause visual artifacts. Zeroing these neurons out significantly improved the final generated image. These neurons effectively gave a sort of quasi-diagnosis on some of the model's failures.

<h3>how exciting is this <i>really</i>?</h3>

At a glance, it is! And that's exactly what I thought. But after showing empirically that neurons <i>do</i> act as concept detectors, the authors bring up an important question in Section 3.2 of the CVPR 2017 paper: are these concepts meaningful? That is, is this phenomenon rare, or does it just kind of occur naturally?

There are two opposing hypotheses for this question. The first suggests that interpretable concepts are actually pretty common in the representation space, so the emergence of these concept-detecting neurons isn't actually so exciting. The second hypothesis proposes that the alignment of neurons with concepts is unusual and only happens because of training. To test these two hypotheses, the authors compare the number of concepts found in a baseline AlexNet model and the same baseline model after a change of basis transform was applied to the $conv5$ feature space. For the sake of simplicity, the transformation is done by multiplying the space with some $Q \in SO_{256}$ (applying a rotation).

According to the paper, the number of unique concepts found in the rotated model was <b>80% less</b> than the number of unique concepts found in the baseline. Moreover, if we instead look at partially rotated models obtained by multiplying by a fractional power $Q^\alpha$, the number of unique concept detectors gradually decreases as $\alpha$ increases from 0 to 1.

This is certainly a convincing case for the second hypothesis, and proposes that this idea of "axis-aligned interpretability" is a special case. At the same time, however, I wonder if these rotated models are necessarily less interpretable than the baseline in other regards. The concepts in the rotated models may no longer correspond to individual neurons, but since $Q$ is orthonormal they may still occur in the unique combinations of several different neurons.<a href="#footnote2"><sup>1</sup></a> If the same concepts are still encoded by the network, would this have a significant effect on the output of other interpretability methods, such as an <a href="https://people.csail.mit.edu/bzhou/publication/eccv18-IBD">interpretable basis decomposition</a>?

<h3>so how does training affect all this?</h3>

Given that the previously mentioned results seem to suggest that axis-aligned interpretability arises during training, one might naturally wonder what kind of training conditions would increase or decrease interpretability. To investigate this, the authors compare the number of concepts found in several randomly initialized baseline training runs, as well as in training runs without dropout and training runs with batch normalization. Each of the randomly initialized models detected a similar number of unique concepts, and with a similar distribution of types of concepts found. It turns out that training with batch normalization significantly reduces both the overall number of concepts and number of unique concepts found. A possible explanation is that batch normalization may have an effect similar to the rotation transformation on the representation space in the previous set of experiments described, thus destroying interpretability. This suggestion comes paired with a warning---accuracy and interpretability are both important characteristics in models, but one doesn't necessarily come for free with the other. This stood out to me, since I had always implicitly coupled discriminative performance and interpretability together. But these are two different things, and at times they may even be at odds against each other.<a href="#footnote1"><sup>2</sup></a>

There were also some experiments comparing concepts found across models of different architectures and primary training tasks. It seems that ResNet tends to perform the best in this regard. However, there are so many possible factors affecting the outcomes in both these experiments that it's hard to tell exactly why these results are the case, so I didn't really find these results as interesting.

While there are possible reasons explaining why batch norm might hurt interpretability, it's unclear exactly what part(s) of training are promoting this. The definition of these concepts is hard to describe mathematically, but optimization is such a mathematical process. How does training so consistently pick up on these concepts? There are many fascinating results in this paper, but even more fascinating questions that come out of it. I'm really interested in what directions this line of work continues to move in going forward.

<h3>lastly, a note to 2021</h3>

The arrival of a new year is always an exciting and refreshing time. I have many big and small plans for the year ahead, but I also don't want to leave behind everything I learned this past year. We started so many important technological and societal chapters in 2020, none of which are nearly close to concluding in 2021. I'm looking forward to becoming a better member of the scientific community this year and in the future! To begin, I'm currently revisiting <a href="https://www.schneier.com/books/data-and-goliath/"><i>Data and Goliath: The Hidden Battles to Collect Your Data and Control Your World</i></a> by Bruce Schneier a little more carefully.

<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>This is how many sensory systems in our bodies work, and it's known as "population encoding" in neuroscience. Basically, we can detect a much larger number of object by using the neurons as a basis rather than having each neuron correspond to an individual object. The response vector of a basis of neurons uniquely encodes a particular smell, taste, or object.</section>

<section id="footnote2"><sup>2</sup>Depending on how intepretability is defined, optimizing for interpretability could mean sacrificing accuracy. For instance, some methods of explaining black box models add a regularizer to the objective function to penalize non-interpretable solutions. However, this generally means that the best solution to a purely performance-based objective is no longer optimal.</section>
</div>
