# Groupify was created for UofTHack IX by Shivar, Robby, Riken, and Brian
## Link to Backend code
[Backend](https://github.com/Shivar-J/Groupify/tree/Backend).

# Inspiration
Covid was a hard time for all of us, many had to find new ways to cope with all of the new stress and anxiety. And thus came music. Being able to listen to music together is especially important during a time where you weren’t able to see your closest friends. 

Prior to the competition, our group had tried to do a Spotify group session, and realised that the system had gone downhill. Users could spam skipping songs and bug out the session. It was overall a bad experience. 

And so, after hearing about the theme, Groupify was born! An easier way to listen to songs with your friends. We aim to bring back the feeling of laughing at your friend's favourite song, and forcing them to listen to your music because you clearly have a superior taste in music.

# What it does

Groupify lets users join listening rooms with your friends. Everybody’s spotify account is synced together so you can all listen to the same music track. Users can play, skip, and seek through songs with their peers. Groupify is a great way to introduce new music to your friends and build connections through music. 

# How we built it

Groupify was built as a website to maximise compatibility with all devices. We decided to use React for our frontend and Flask for our backend. We used React for our frontend because it was an opportunity to learn new JavaScript libraries. We used the react-scroll-motion library to add some scrolling animations and spice up our page. For our login page we used the information we collected from Spotify’s API to handle which user is logged in and using the program. We then got their current song and displayed it on the dashboard and shared it to the other users in the group. On the backend we used Flask to access and call Spotify’s API and collect and send data. We used websockets to handle sharing song data and its timestamp to other users. Overall this project was a very engaging and challenging one and allowed us to learn and improve our skills.

# Challenges we ran into

When we first started out, looking at it simply we would just need to use Spotify’s WebSocket API to see when the user changes their song. We had seen an example of this from Discord, and how they were able to track what you were listening to. However, Spotify only provides its WebSocket API to authorised developers. Therefore forcing us to find a way to get a constantly updated version of our users currently playing tracks, to keep them synced with the rest of the people in a room. We were able to overcome this challenge by polling Spotify's free user’s playbackstate endpoint. This isn’t the most elegant solution but it allows us to bypass the unnecessary restrictions and restore group sessions to their former glory. 

# Accomplishments that we're proud of

## Building the music player
The accuracy of the sync between peers
We learned so much in such a short time, and are glad that it was possible for us to participate in such a great opportunity. 

## What we learned
Our group learned more about React, Flask, and coding backends. We were able to add animations to our website, which was a first. 

# What's next for Groupify
Our next step for Groupify is to add the functionality for multiple rooms. Currently, we only have one room available and it’s public for all to join. We want to add functionality for multiple rooms and private rooms that are accessed by secret room codes. This will be a major step towards setting Groupify up for public use.

