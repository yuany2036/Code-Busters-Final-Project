import React from "react";
import styles from "./About.module.scss";
import Contributors from "./Contributors";

const About = () => {
  const contributors = [
    {
      h3: "Gladys",
      p: "'I've always loved watching movies, but I found that I was always forgetting what I had seen or read. When I heard about this project, I knew that it was something that could help me and others like me keep track of our favorite titles and discover new ones.'",
      image: "https://aniyuki.com/wp-content/uploads/2022/03/aniyuki-anime-girl-avatar-44.jpg",
      recommendation: "Favorite book: , Favorite movie:",
    },
    {
      h3: "Mihaela",
      p: "'As a booklover and movie watcher myself, I was frustrated by the lack of a comprehensive app that allowed me to easily track my favorite titles. That's why I was inspired to work on this project and create a solution for myself and others like me.'",
      image: "https://e1.pxfuel.com/desktop-wallpaper/467/133/desktop-wallpaper-pin-on-anime-y-mas-anime-avatar-girl.jpg",
      recommendation: "Favorite book: , Favorite movie:",
    },
    {
      h3: "Niko",
      p: "'I've always been interested in technology and its potential to improve people's lives. When I heard about this project, I saw an opportunity to use my skills to create something that could make a real difference for booklovers and movie watchers.'",
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/125498163/original/db8a750c2a8f337e31274e750f0fdd34236b37d5/draw-your-roblox-minecraft-or-any-avatar-into-anime-art.jpg",
      recommendation: "Favorite book: , Favorite movie:",
    },
    {
      h3: "Yu-An",
      p: " 'I'm passionate about creating innovative solutions to everyday problems, and I saw an opportunity to do just that with this project. By combining my technical expertise with my love of books and movies, I knew that I could help create something truly special.'",
      image: "https://wallpapers.com/images/hd/cute-anime-boy-profile-picture-k2i3pwrorzcmosni.jpg",
      recommendation: "Favorite book: , Favorite movie:",
    },
  ];
  return (
    <>
      <div className={styles.about}>
        <div className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            For all the bookworms and cinephiles out there, <span> Entscape </span>is a wonderful tribute to <span>the joy </span> of reading and watching
            movies. It's all about the enchanting experiences that occur when readers and movie lovers <span>unite</span> to exchange ideas, educate, absorb
            knowledge, engage in discussions, argue, and revel in their shared <span>passion</span> .
          </p>
        </div>
        <div className={styles.team}>
          <h2>Meet the team</h2>
          <div className={styles.contributors}>
            {contributors.map((contributor, index) => {
              return <Contributors key={index} {...contributor} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
