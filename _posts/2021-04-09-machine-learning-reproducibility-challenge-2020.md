---
layout: post
title: the 2020 ml reproducibility challenge
date: 2021-04-09
tags: papers mlrc
refs: 
  - > 
    Krishna Kumar Singh, et al. "Don’t Judge an Object by Its Context: Learning to Overcome Contextual Bias." In <i>CVPR</i> 2020.
  - > 
    Sunnie S. Y. Kim, et al. "[Re] Don’t Judge an Object by Its Context: Learning to Overcome Contextual Bias." Machine Learning Reproducibility Challenge 2020. In <i>ReScience C</i> Journal.
---

Recently, I wrapped up some work on the <a href="https://paperswithcode.com/rc2020">2020 Machine Learning Reproducibility Challenge</a> with the <a href="https://visualai.princeton.edu/">Princeton Visual AI Lab</a> team. Over the span of four months, we worked on reproducing all the experiments and proposed methods in a paper from CVPR 2020. I learned so much from this experience, and would highly recommend participating in the challenge to any undergrad interested in getting into a new area of machine learning.

<!--excerpt-->

As stated on their website, the MLRC aims "to encourage the publishing and sharing of scientific results that are reliable and reproducible." In addition to this, I can also add (from personal experience now!) that it's an amazing opportunity to dive into an ML subfield and get your hands dirty. Throughout this project, we encountered many of the same challenges that one might run into while conducting their own original research, and getting past them required a lot more effort than simply giving the original paper another read through.

The paper we selected (found by our fearless project leader, <a href="https://sunniesuhyoung.github.io/">Sunnie</a>) is titled <a href="https://arxiv.org/abs/2001.03152"><i>Don't Judge an Object by It's Context: Learning to Overcome Contextual Bias</i></a> by <a href="http://krsingh.cs.ucdavis.edu/">Krishna Kumar Singh</a> et al. This is a really interesting paper that tackles a deeply important problem in visual classification: <i>contextual bias.</i> Contextual bias occurs when the visual cues of an object's surroundings influence the classifier's prediction probability of that object, for better or worse (usually for worse). This often results directly from datasets with certain co-occurence patterns---that is, high co-occurence rates between two category labels. To take an example from the original paper and our report, the object category "skis" in the COCO dataset typically appears in snowy settings with people. It just so happens that "person" is also a labeled category in the COCO dataset. Thus, the features learned by a vanilla classifier to predict the presence of a pair of skis may be strongly correlated with the features used to predict the presence of a person. Moreover, these feature representations may not be suitable for identifying images of skis where they are not being used out on the mountains, such as the image on the right below. As a result, the classifier might perform poorly on examples liek this, where skis appear without people or snow.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-09-fig1.png" alt="'Skis' and 'people' in the COCO dataset" style="width:100%">
  <figcaption>Figure 1. Images with the label "skis" in the COCO dataset. Notice how different the surroundings of the skis are when they appear without the category "person".</figcaption>
</figure>

The original paper proposes two different methods to mitigate this performance drop due to contextual bias. The authors already do a really good job of explaining the intuition and details behind all these methods in their paper, so I'd recommend checking it out if you're interested in the details. They compare these methods against seven other approaches, which were referred to as "strong baselines," and also do a bunch of qualitative analyses. We reconducted each and every one of their experiments, covering 12 tables and multiple figures in total. Afterwards, we also did a few ablation studies to further investigate the details of their proposed methods.

We were able to reproduce most of the claims that were made in the original paper, but I won't talk too much about those results---all the key reproducibility takeaways of our experience are included in <a href="https://openreview.net/forum?id=PRXM8-O9PKd">our paper</a>, so definitely check it out if you're interested! Instead, I wanted to reflect on some things I learned---some related to reproducibility and research, and others not so much.

<h3>why participate in this challenge (aside from the reproducible science part)</h3>

Machine learning is an overwhelming field in terms of the number of papers being published every year, so encouraging reproducibility as a practice is important to ensure that quality keeps up with quantity. I completely get that. But for a lot of people trying to break into such an exciting and rapidly moving field, simply reproducing someone else's work might feel... unexciting. To speak as a devil's advocate---it can already take considerable effort to keep up with all the new ideas being put out in a single subfield, let alone come up with your own. So why spend several months trying to redo what someone has already done?

For one, there's a lot more to computer science research than simply thinking about new ideas. Ideas need to be implemented and tested, and experiments need to be run. To do this, you need to, at the very least, pick up PyTorch or Tensorflow or some other library. Experiments inevitably run into bugs, and debugging requires additional tools like TensorBoard or visualization methods. And finally, training models requires GPUs, and running GPU jobs on remote clusters is its own entire thing. These are just some of the things I had to pick up, and I am by no means an expert in any of them yet either---however, I am a much better research coder than I was before.<a href="#footnote1"><sup>1</sup></a>

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-04-09-fig2.png" alt="Email inbox with SLURM job notifications" style="width:100%">
  <figcaption>Figure 2. Perhaps I need to ease off the <code>sbatch job.sh</code> commands for a bit.</figcaption>
</figure>

The other reason I really appreciate having participated is that doing so gave me a chance to think about how I write technical papers. ML conference papers are usually limited to 8-9 pages in the main report, which can be a tight space to fit in a ton of text, figures and tables. The paper we chose was already quite clear---we were able to understand more than enough to get a deep sense of how the methods worked, and there were also additional implementation details in the appendix. Even so, there were still some small clarifications to be made about how to go about doing certain things.<a href="#footnote2"><sup>2</sup></a> We also wanted to make sure our implementation was replicating the original authors' setup as closely as possible, so in general we opted to ask for additional details.

<h3>our biggest challenges</h3>

Since the paper we chose did not have an accompanying code base, our first step was to re-implement all the methods and experiments they described. Some of the strong baselines were pretty straightforward, but others gave us quite a bit of trouble. The thing is, you can understand a paper down to the hyperparameter, but that doesn't mean you can code it up. For example, one of the proposed methods required freezing the weights (disabling backpropagation) through a particular subset of the network for certain examples during training. Since none of us had written this type of training regime before, we weren't exactly sure how to accomplish this. In our first iteration, we simply zeroed out the gradients going through the frozen subset. This seemed reasonable, but our results weren't matching up well with the original numbers. 

At one point, we realized that this zeroing-out approach wasn't working because of momentum being applied automatically during the <code>backwards()</code> call during backpropagation (we were using PyTorch). The entire debugging trail seemed to reach a dead end at this function, so we decided to set momentum to 0 for the time being. After cleaning up several other mistakes and misinterpretations, we finally achieved some comparable results. Then, about a week before the submission deadline, we ended up getting additional feedback from the authors about their own implementation, and learned that they wrote it up in a way such that momentum could be added back into the equation. Frantic refactoring ensued, and results improved!

Through all our trials and errors, different debugging techniques and sanity checks helped us eventually figure out where our errors were. Inspecting training curves and looking at class activation maps (CAMs) gave us huge pointers to when something was wrong. Discrepancies between our results and the original paper's results inspired multiple Slack threads about dataset distributions and random seeds to try and reason out the differences. I learned a ton from all of these discussions, and definitely also became more confident asking questions and raising ideas. Another huge component of this entire experience was working alongside the rest of the Visual AI Lab team---I figured out what kind of working enviroment I thrive in, and befriended two other students in the lab during a virtual semester!

<h3>main takeaways</h3>

To condense a lot of thoughts into a few sentences:

1. Do the ML reproducibility challenge! It's definitely worth the time and effort.
2. Reproducing something is harder than it sounds. Reproducing something without starter code will be 2x as hard.
3. However, a great team can make life 2x easier.

Another thing that I'm hoping to do moving forward (inspired by this experience) is to keep a Big Bug 🐞 Log. The idea is to keep track of all significant bugs I encounter in projects, so that I can maybe reference them down the road and resolve future bugs with less effort. Sort of like Github Issues, I'm planning on recording a brief description of the bug, potentially a stack trace, and also (hopefully!) the solution. I still haven't figured out exactly how to organize or structure this, but I think it might be useful.

<i>The other members of the Princeton Visual AI MLRC team were: <a href="https://sunniesuhyoung.github.io/">Sunnie S. Y. Kim</a>, Nicole Meister, and <a href="https://www.cs.princeton.edu/~olgarus/">Professor Olga Russakovsky</a>.

<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>Examples of some details we asked for additional clarifications on: model selection (which epoch to use in evaluation?), training schedules, hyperparameters.</section>

<section id="footnote2"><sup>2</sup>I also finally learned how to use <code>argparse</code> properly (instead of <code>sys.argv</code>) so that I could test different versions of things quickly and easily.</section>
</div>