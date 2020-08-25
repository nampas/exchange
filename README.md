# Exchange

Reveal messages simultaneously

[See it in action here](http://exchange-public-lb-115446130.us-east-1.elb.amazonaws.com/)

## What?

Frequently, a discussion might go something like this:

_Person A: What do you think of X?_  
_Person B: Oh, I think X is totally Y._  
_Person A: Oh right. I think X is totally Y too._

In this situation, Person A is at a bit of an advantage. By the time she expresses her opinion, Person B has already given his. That allows Person A the option to tailer her reponse in a way that meshes with what she has just heard. Maybe that means taking a weaker stance on the topic, or even agreeing with Person B for the sole purpose of avoiding conflict.

Exchange is a simple webapp where two users can respond to a prompt, and their responses will only be visible to each other once both are submitted. In this way, both people are in Person B's shoes.

The original motivation for this arose from a game of [Diplomacy](https://en.wikipedia.org/wiki/Diplomacy_(game)). The game is all about communication and strategic misinformation, and there was a moment where I wanted myself and an opponent to reveal our plans to each other at the same time.

## Code things

Nothing too crazy going on here. node + postgres stack, vanilla frontend with bootstrap. Running in ECS & LightSail.
