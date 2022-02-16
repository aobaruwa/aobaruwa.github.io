---
layout: post
title: "race, math, and computers (part 2)"
date: 2020-06-02
tags: social-technology
refs:
  - >
    Buolamwini, Joy, and Timnit Gebru. "Gender shades: Intersectional accuracy disparities in commercial gender classification." <i>Conference on fairness, accountability and transparency.</i> 2018.
  - >
    Wang, Zeyu, et al. "Towards Fairness in Visual Recognition: Effective Strategies for Bias Mitigation." <i>arXiv preprint arXiv:1911.11834</i> (2019).
    
---

Continuing on the theme of my <a href="https://sxzhang25.github.io/blog/2020/06/02/race-math-and-computers-pt-1">previous blog post,</a> I want to turn towards the topic of race and technology, particularly in computer vision. Computer vision and artificial intelligence (AI) have an extremely imperfect relationship with race, from the misuse of facial recognition technology to the racial misclassifications by neural networks on Black faces. This technology is still relatively young---it is imperative that we fix these issues early on in the development and continued research of artificial intelligence and computer vision.

<!--excerpt-->

<h3>race and computers</h3>
Technology, in general, <a href="https://www.theatlantic.com/technology/archive/2018/09/tech-was-supposed-to-be-societys-great-equalizer-what-happened/571660/">has not been an equalizer,</a> despite such claims. Modern life increasingly depends on easy access to a computer, smartphone, and wifi. A <a href="https://broadbandnow.com/research/fcc-underestimates-unserved-by-50-percent">BroadbandNow study reports</a> that this around 42 million Americans (nearly 13% of the US population) live without access to broadband internet access. The coronavirus pandemic has only highlighted and deepened this digital divide at a time when the Internet is a crucial provider of up-to-date news coverage on the outbreak.


<h3>where computer vision and artificial intelligence fail</h3>
It may seem as if the quantitive and numerical nature of technology excuses AI from developing the prejudices and biases inherent in human decision-making. But this presumption ignores an important issue: AI depends on data curated by humans.

It might not seem like data can create prejudice---after all, it is just information. In many cases, it is no more than strings of numbers and text. However, data currently holds the majority of the influence on what a machine learning algorithm learns, and how it learns. More importantly, data has shown us that it continues to carry out the prejudices and biases we ourselves hold. This has been proven time and time again: <a href="https://www.wired.com/story/the-apple-card-didnt-see-genderand-thats-the-problem/">Apple's recent credit card collaboration with Goldman Sachs</a> was found to offer lower credit rates to women than men, <a href="https://www.youtube.com/watch?v=QxuyfWoVV98">facial recognition technologies</a> miscategorize dark-skinned women, and <a href="https://www.theverge.com/2018/10/10/17958784/ai-recruiting-tool-bias-amazon-report">Amazon had to scrap a hiring algorithm</a> that developed biases against women.

The solutions to these problems are not straightforward. We cannot simply rely on machines to be "blind" towards certain pieces of information when we train them---the algorithm used to calculate credit rates associated with Apple's credit card, for example, did not even collect gender as a data point from users. In eliminating these pieces of information, we are not solving the problem, but merely attempting to exculpate our technology from its involvment in discrimination. More productive approaches should aim to change <i>how</i> these models learn and whether or not they should be used in the first place.

<h3>combatting racial discrimination in ai</h3>
Computer vision systems have been highlighted in particular when it comes to racial discrimination in artificial intelligence. Facial recognition technology has failed over and over again by incorrectly recognizing dark-skinned faces (and in some instances, <a href="https://www.technologyreview.com/2019/01/21/137783/algorithms-criminal-justice-ai/">incarcerating them</a>) or ending up in <a href="https://www.npr.org/2019/12/16/788597818/how-china-is-using-facial-recognition-technology#:~:text=Facial%20recognition%20technology%20became%20part%20of%20the%20fabric%20of%20life,using%20the%20technology%20for%20surveillance.">inhumane use-cases.</a><a href="#footnote1"><sup>1</sup></a> One significant source of this bias is rooted in training data. In their paper <a href="http://proceedings.mlr.press/v81/buolamwini18a.html"><i>Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification</i></a>, Joy Buolamwini and Timnit Gebru find that standard benchmark datasets for facial recognition are comprised by overwhelmingly light-skinned images. The authors also trained and tested actual facial classifiers on these datasets and found that classifiers post accuracies with an 11.8% to 19.2% increase in error rate when tasked with identifying dark-skinned faces versus when tasked with identifying light-skinned faces.<a href="#footnote2"><sup>2</sup></a> Models have also been known to associate certain activities with certain genders: models are more likely to recognize the activity of "driving" when an image depicts a man driving, and they are more likely to recognize the activity of "cooking" when an image depicts a woman cooking.<a href="#footnote2"><sup>3</sup></a>

I was first exposed to this problem at the end of my first computer vision class in the fall of 2019. My professor was extremely keen on solving this problem</a> and has done a lot of research on ways to mitigate these biases. One strategy involves <a href="https://arxiv.org/pdf/1912.07726.pdf">rebalancing the training datasets</a> to include more images of the entire spectrum of skin colors. While this is a foolproof way to ensure equal training time spent on images of people with various skin tones, it can be hard to compile and train machines on so many images. Other methods target the training methods: sampling from unbalanced datasets to simulate a balanced dataset, adversarial training to debias classifiers, and domain discriminative training are all methods surveyed in the paper <a href="https://arxiv.org/pdf/1911.11834.pdf"><i>Towards Fairness in Visual Recognition: Effective Strategies for Bias Mitigation</i></a> by Zeyu Wang, et al.

The latter seems to be a more productive and efficient way of addressing unfairness. Datasets can be expensive to collect and annotate properly, and it doesn't seem entirely right to ignore large portions of information which we have readily available. Finding ways to teach machines and algorithms how to make equally valid conclusions on two different but related domains, independent of the size of each domain, is also a better representation of how humans learn. After all, humans can easily identify other humans even when they look entirely different from us.

<h3>beyond technology</h3>
Finally, we shouldn't forget that operating above all technology is <i>policy</i>. Policy governs everything from how companies handle our personal information to how transparent companies must be about their handling of algorithms. Companies need to be held accountable for ensuring that their technologies work towards eliminating and combatting racism, not perpetuating it (even unconsciously). Dr. Ruha Benjamin, a professor at Princeton University, wrote <a href="https://www.ruhabenjamin.com/race-after-technology"><i>Race After Technology</i></a> describing the relationship between technology and racialization (update: it was an amazing read). Another great book that covers discrimination in data and the importance of digital privacy policies is Bruce Schneier's <a href="https://www.google.com/books/edition/Data_and_Goliath_The_Hidden_Battles_to_C/MwF-BAAAQBAJ?hl=en&gbpv=0"><i>Data and Goliath: The Hidden Battles to Collect Your Data and Control Your World</i>.</a>

It can be easy for technologists and computer scientists to separate themselves from politics because science and math are seen as amoral fields. However, science and society are so deeply intertwined---society produces the problems which science studies, and science proposes solutions that are implemented in society. To study one while ignoring the other is a fatal mistake, and one that I've probably overlooked many times in the past. It's not "fun" to think about---after all, some of us went into science because we prefer not to think about these things. However, in order to hold ourselves responsible for the consequences of our technology, we need to always be thinking about how to regulate it. Staying aware of technology policies and voting for politicians who understand how much technology impacts society is key to a stronger scientific community.

<h3>additional resources</h3>
<ul>
  <li><a href="http://d4bl.org/">Data for Black Lives</a></li>
  <li><a href="https://ainowinstitute.org/ads-shadowreport-2019.pdf">Read about the use of automated decision systems (ADS) in New York City</a></li>
  <li><a href="https://www.nytimes.com/interactive/2019/opinion/internet-privacy-project.html">The Privacy Project by the New York Times</a></li>
  <li><a href="https://freedom-to-tinker.com/">Freedom to Tinker, a blog by the Princeton University Center for Information Technology Policy</a></li>
</ul>

<br>
<a href="https://sxzhang25.github.io/blog/2020/06/02/race-math-and-computers-pt-1">[Go back to part 1]</a>


<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup><i>The New York Times</i> podcast, <i>The Daily</i>, has <a href="https://www.nytimes.com/2020/02/13/podcasts/uighurs-coverage-daily-podcast.html">a chilling and fascinating episode</a> on China's surveillance of Uighur populations in Western China.</section>

<section id="footnote2"><sup>2</sup>IBM released <a href="http://gendershades.org/docs/ibm.pdf">a statement</a> addressing the issue after the paper was published.</section>

<section id="footnote2"><sup>3</sup>I don't have a source for this, but this information is from a presentation given by Dr. Russakovsky as part of a Carnegie Mellon University lecture series. The slides from the talk are posted <a href="https://visualai.princeton.edu/slides/Fairness_CVPR2018.pdf">here.</a></section>
</div>


