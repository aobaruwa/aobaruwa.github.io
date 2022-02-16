---
layout: post
title:
  - >
    <i>coded bias</i>: technology's relationship with human rights
date: 2020-06-15
tags: social-technology
refs:
  - >
    Buolamwini, Joy, and Timnit Gebru. "Gender shades: Intersectional accuracy disparities in commercial gender classification." <i>Conference on fairness, accountability and transparency.</i> 2018.
  - >
    Wang, Zeyu, et al. "Towards fairness in visual recognition: Effective strategies for bias mitigation." <i>Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition.</i> 2020.
  - >
    Kaiyu Yang, Klint Qinami, Li Fei-Fei, Jia Deng, and Olga Russakovsky. 2020. "Towards fairer datasets: filtering and balancing the distribution of the people subtree in the ImageNet hierarchy." <i>In Proceedings of the 2020 Conference on Fairness, Accountability, and Transparency (FAT* ’20).</i> Association for Computing Machinery, New York, NY, USA, 547–558. DOI: https://doi.org/10.1145/3351095.3375709
---

From June 11 to June 20, <a href="https://www.hrwfilmfestivalstream.org/">the Human Rights Film Festival</a> is streaming a digital version of the documentary <i>Coded Bias</i>, a film by Shalini Kantayya centered on the experiences and research of MIT Media Lab computer scientist Joy Buolamwini in the space of racial bias in technology. I highly recommend this film <a href="https://www.hrwfilmfestivalstream.org/film/coded-bias/">if you can pay to watch it (it's only $9!)</a>---it features the voices of a lot of prominent researchers and activists in the field and digs deep into <i>why</i> machine algorithms can be inherently biased when all they are composed of is mathematics. Also, I'll give a quick spoiler alert because I'm going to talk about pretty much every part of the film.

<!--excerpt-->

The film recounts the story of how Buolamwini wanted to create a "smart" mirror which would be able to track her face and overlay inspirational filters over it. However, the facial recognition software that Buolamwini used failed to recognize her face until she put on a white mask. This problematic discrepancy essentially started what would be a long journey into researching the inherent biases encoded into the widespread AI algorithms used today, and a push for systemic change that would eventually bring her to testify in front of Congress. Throughout the film, we are introduced to countless other activists, researchers, scientists and lawyers who are also conducting experiments and publishing reports on the ethical implications of public use of machine learning algorithms.

We also meet many ordinary people who have been affected by the introduction of machine learning algorithms and facial recognition surveillance systems in the US. I was actually more shocked by these stories, because they really revealed how common these seemingly futuristic practices already are in Western countries. At this point, we all know about China's extensive reliance and abuse of facial recognition technologies, but this film shows that the US is really not on a much better path either.

<h3>a brief history of AI</h3>

In the earlier portion of the film, we are given a brief overview of <a href="http://sitn.hms.harvard.edu/flash/2017/history-artificial-intelligence/">the origins of artificial intelligence,</a> a story that I feel is not often told in modern STEM curriculum. Basically, AI was started at a Dartmouth conference in 1956 by a group of mathematicians. This might seem like an insignificant bit of trivia, but the film highlights the fact that the people at this conference essentially "got to decide what the field was," and consequently define what the "intelligence" part of "artificial intelligence" meant. They settled on having a machine be able to beat a human in games, which is why strategic games such as Tic-Tac-Toe, chess, and Go have often taken center-stage in the media stories about AI. The definition of intelligence was thus created by a small, homogeneous group of people and continues to be defined by a similar group of people---namely, the white male CEOs of the largest tech companies in the world.

This definition of intelligence in AI has largely persisted. Only very recently has the introduction of ethics into AI began to question the notion that in order to be smart, an AI should be able to navigate complex, logical situations which are usually very black and white. One of the main reasons why I don't hesitate to recommend this documentary is that it directly questions how we measure the "success" of these machine learning algorithms built into the core framework of AI systems. At the very end of the documentary, we are brought back to this definition when Zeynep Tufekci says,

<blockquote>
<div class="quote">
  "Being fully efficient, always doing what you're told, always doing what you're progammed, is not always the most human thing. Sometime's it's disobeying, sometimes it's saying 'no, I'm not gonna do this.' And if you automate everything, so it always does what it's supposed to do, sometimes that can lead to very inhuman things."
</div>
</blockquote>

This is easily one of my favorite quotes from the entire film. The idea that in order for technology to be truly intelligent, it has to know when to disobey, is something I never thought about. Simply having a machine be 100% successful is not ethically enough, because when humans reason through ethics we often question the authorities. Without the ability to do this, machines simply regurgitate and reproduce the status quo.

<h3>how the current state of AI actually makes inequality worse</h3>

This idea of reproducing the status quo is also another large theme in the film. A common pipeline for training AI systems is to train them on massive datasets curated by the people using those AI systems or developed by the researchers in the field. These datasets tend to carry over the unconscious biases that its curators have, or if they are pulled from the real world then they reflect the current state of society. This state is then encoded into the AI during the training process, thus teaching the AI to effectively reinforce existing trends. But how can we create social change if these machines serve to only perpetuate the current norm? As more and more processes such as hiring, assigning credit scores, college admissions, criminal surveillance, and even assigning tenure (these are all examples mentioned in the documentary) incorporate machine learning algorithms, the potential for these machines to mask the inherent biases that they learn under the facade of "amoral" mathematical logic becomes increasingly dangerous. I talked about this in <a href="https://sxzhang25.github.io/blog/2020/06/02/race-math-and-computers-pt-1">my previous blog posts</a>, but this film actually demonstrates that the ubiquity of such algorithms is far greater than what I described.

We can actually take this a step further, and observe that reproducing the status quo doesn't actually just maintain existing inequalities. As these algorithms reapply the patterns of discrimination already ingrained in corporate, healthcare, and criminal justice systems in an efficient and automated manner, they exacerbate the division between those who are poorer and marginalized and those who are wealthier and privileged. One example cited in the film is the disproportionate care received by White patients compared to Black patients in hospitals. It was found that the underlying technology used by UnitedHealth Group to identify patients that would benefit from certain procedures <a href="https://www.businessinsider.com/an-algorithm-treatment-to-white-patients-over-sicker-black-ones-2019-10">tended to favor White patients over Black patients,</a> essentially preventing Black patients from receiving the attention and quality of care that they needed. One natural result of this would be that Black patients might have incomplete recoveries, and consequently be more prone to future hospitalizations. Another example of this vicious cycle is recidivism-risk algorithms, or algorithms that forecast how likely a defendant is to re-offend. <a href="https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm">An analysis of one such tool made by Northpointe, Inc.</a> revealed that White defendants were more likely to be incorrectly flagged as low-risk, and Black defendants were more likely to be incorrectly flagged as high-risk.

<h3>accuracy vs. abuse</h3>

When Buolamwini published a paper that criticised IBM's facial recognition technology for failing to correctly classify darker-skinned faces and female faces, IBM went back and redeveloped the model. They ended up improving their accuracies for darker-skinned males, darker-skinned females, and lighter-skinned females from 60%-70% to at least 96%. This just serves to show that accuracy in these models is completely possible, and there should be no excuse for poor performances on certain groups of people in facial recognition. Despite this, Buolamwini was reluctant to celebrate the change entirely. She notes that even with perfect accuracy, these systems would then just be used to criminalize darker-skinned faces even more aggressively. The point is that accuracy is only half of the story; the abuse of these technologies is the real source of the problem.

At this point, Buolamwini is now also fully involved in a government hearing that examines the need for oversight on facial recognition technology useage on civilians. We see clips of her testifying in front of Congress and being questioned by Senator Alexandria Ocasio-Cortez and others.<a href="#footnote1"><sup>1</sup></a> Changes begin to take place---cities such as San Francisco, Houston, Oakland, and others begin banning the use of facial recognition technology. Coupled with <a href="https://www.forbes.com/sites/larrymagid/2020/06/12/ibm-microsoft-and-amazon-not-letting-police-use-their-facial-recognition-technology/#67611afe1887">the recent statements by IBM, Amazon and Microsoft</a> refusing to let police use their facial recognition technology, it's impossible to not feel hopeful. It was really amazing to see all their hard work transform into actual change. That being said, there is still very little federal regulation of these AI systems, and there is a lot more to be done in the scientific space as well. The intersection of ethics and technology is not fully emulsified yet, and their marriage may never be a perfect one. I would like to think, though, that we can actively reimagine and repurpose our technology in ways that can effect more changes in the direction that Buolamwini and her colleagues have gone. In a post on the Princeton University Center for Information Technology Policy's blog, Freedom to Tinker, Angelina Wang <a href="https://freedom-to-tinker.com/author/angelina-wang/">expresses this in a way</a> that has really stuck with me:

<blockquote>
<div class="quote">
  "Supervised machine learning has traditionally been focused on predicting based on historical and existing data, but maybe we can structure our data in a way that is a model not of the society we actually live in, but of the one we hope to live in."
</div>
</blockquote>

<h3>some of my other favorite moments</h3>

There are a lot of experiments, reports, interviews, and anecdotes packed into the 90 minutes of the film. Collectively, they reinforce the urgency of the need for proper technology policy to be put in place. I'll highlight a few moments that particularly resonated with me:

<ol>
<li>A video of Hong Kong protestors spray painting CCTV cameras in front of a Chinese government office. The accompanying narration states, "The people of Hong Kong are rejecting this vision of how technology should be used in the future."</li>
<li>Buolamwini reflects on the pushback she receives from Amazon after she publishes a paper detailing the racial bias in their facial recognition technology. She says that as a woman in tech, "expect to be discredited, expect your research to be dismissed."</li>
<li>A point is made that Facebook, <a href="https://venturebeat.com/2019/03/05/amy-webbs-the-big-nine-predicts-the-impact-of-ai-and-tech-giants-over-the-next-50-years/">one of the "big nine" global companies</a> leading the development and impact of AI, has 2.6 billion users. The population of China, the country most well-known for state-sponsored civilian surveillance, is 1.4 billion people.</li>
</ol>

There are many other instances of discrimination on the ground that are mentioned in the film, and they were equally memorable. I don't want to simply recap the whole documentary, so I'll refrain from going into any more of the scenarios the film discusses. I highly urge anyone interested in machine learning and AI to watch this film and see the rest of the stories told.

In addition to these moments, I also want to highlight how much I admire Joy Buolamwini as a researcher. She could have easily pivoted when she encountered that first problem with her smart mirror, but instead she honed in on the problem and developed an entirely new direction of research. On top of that, she pushed this problem all the way to the federal level, and even testified in front of Congress. I keep coming back to that moment in the film when AOC asks her clarifying questions on the nature of discrimation in facial recognition technology, because both women are so confident, well-spoken, and knowledgeable. I feel extremely grateful to be able to have them as role models.<a href="footnote2"><sup>2</sup></a> The entire documentary, actually, is dominated by female activists and researchers working to change the relationship between machine learning and ethics. I'm sure this was an intentional choice, but I think that it also had to be influenced by the demographics of those in this space---I wouldn't doubt that women, especially women of color, tend to be more vocal about these things because it predominately affects them. This would be another unfortunate instance of white male privilege in our society.

<h3>moving forward</h3>

There are a <i>lot</i> of resources mentioned in the documentary, so I thought I would attempt to compile as many of them as I could. I also pulled some additional ones collected by my friend Dora, who has read way more about this than I have. I've mentioned some of these links in previous posts, but it doesn't hurt to revisit them.

<b>organizations</b>
<ul>
<li><a href="https://www.ajlunited.org/">Algorithmic Justice </a> (founded by Joy Buolamwini)</li>
<li><a href="http://d4bl.org/">Data 4 Black Lives</a></li>
<li><a href="https://bigbrotherwatch.org.uk/">Big Brother Watch</a></li>
</ul>

<b>books</b>
<ul>
<li><a href="https://weaponsofmathdestructionbook.com/"><i>Weapons of Math Destruction</i></a> by Cathy O'Neil</li>
<li><a href="https://mitpress.mit.edu/books/artificial-unintelligence"><i>Artificial Unintelligence</i></a> by Meredith Broussard</li>
<li><a href="https://nyupress.org/9781479837243/algorithms-of-oppression/"><i>Algorithms of Oppresion</i></a> by Safiya Noble</li>
<li><a href="https://www.twitterandteargas.org/"><i>Twitter and Teargas</i></a> by Zeynep Tufekci</li>
<li><a href="https://amywebb.io/books"><i>The Big Nine</i></a> by Amy Webb</li>
<li><a href="https://www.ruhabenjamin.com/race-after-technology"><i>Race After Technology</i></a> by Ruha Benjamin</li>
<li><a href="https://virginia-eubanks.com/books/"><i>Automating Inequality</i></a> by Virginia Eubanks</li>
<li><a href="https://fairmlbook.org/"><i>Fairness and Machine Learning</i></a> by Solon Barocas, Moritz Hardt, and Arvind Narayanan (incomplete draft)</li>
<li><a href="https://wwnorton.com/books/Technically-Wrong/"><i>Technically Wrong</i></a> by Sara Wachter-Boettcher</li>
<li><a href="https://press.princeton.edu/books/hardcover/9780691182070/hacking-diversity"><i>Hacking Diversity</i></a> by Christina Dunbar-Hester</li>
<li><a href="https://www.schneier.com/books/data_and_goliath/"><i>Data and Goliath</i></a> by Bruce Schneier</li>
</ul>

<b>web + media</b>
<ul>
<li><a href="https://georgetownlawtechreview.org/">Georgetown Law Technology Review</a></li>
<li><a href="https://www.technologyreview.com/">MIT Technology Review</a></li>
<li><a href="https://www.nytimes.com/series/new-york-times-privacy-project"><i>The New York Times</i> Privacy Project</a></li>
<li><a href="https://freedom-to-tinker.com/">Freedom to Tinker</a></li>
</ul>

<b>podcasts</b><a href="#footnote3"><sup>3</sup></a>
<ul>
<li><a href="https://www.nytimes.com/2020/02/10/podcasts/the-daily/facial-recognition-surveillance.html">The Daily: The End of Privacy as We Know It?</a></li>
<li><a href="https://www.nytimes.com/2019/05/06/podcasts/the-daily/china-surveillance-uighurs.html?action=click&module=RelatedLinks&pgtype=Article">The Daily: The Chinese Surveillance State, Part 1</a></li>
<li><a href="https://www.nytimes.com/2019/05/07/podcasts/the-daily/china-uighurs-internment-camps-surveillance.html?action=click&module=RelatedLinks&pgtype=Article">The Daily: The Chinese Surveillance State, Part 2</a></li>
</ul>

<b>other</b>
<ul>
<li><a href="https://facctconference.org/">ACM Conference on Fairness, Accountability, and Transparency (ACM FAccT)</a></li>
</ul>

There are also some papers that I've left to the References section below. I know it's a lot, and I definitely haven't read all of the books and articles listed, but I think having too many resources beats having too little resources by far. I want to keep track of these things, even if it's just for myself.

<h3>updates</h3>
<ul>
<li>6/15/2020: I just got recommended <a href="https://www.youtube.com/watch?v=jZjmlJPJgug">this John Oliver video</a> on Youtube, which happened to be uploaded 10 hours ago (as of this update). Quite the coincidence.</li>
</ul>


<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>I would just like to mention how excited I was seeing both Buolamwini and AOC in one room. It was so inspiring seeing the conversation being helmed and driven by two young women of color, and I want to remember those clips forever.</section>

<section id="footnote2"><sup>2</sup>I also want to point out a really brief moment in the film when Buolamwini is having a discussion on stage with a group of women, one of whom is Janna Levin, an astrophysicist at Barnard College. I first found out about Levin in high school, when I read her piece <a href="https://www.brainpickings.org/2016/08/16/life-on-a-mobius-janna-levin-moth/">"Life on a M&ouml;bius Strip,"</a> in which she relates her work in astrophysics to her own personal life. It's an <i>amazing</i> read.</section>

<section id="footnote3"><sup>3</sup>Apologies for the lack of diversity in resources here---I usually listen to The New York Times' 'The Daily' and NPR's 'Throughline' and these are the only episodes I really remember from both podcasts which touch specifically on this issue.</section>
</div>
