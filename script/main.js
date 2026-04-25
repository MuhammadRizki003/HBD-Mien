// Animation Timeline
import 'regenerator-runtime';
import '../style/style.css';
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];
  const h5 = document.querySelector(".wish h5");
  let flakeTweens = [];
  let flakeElements = [];
  function createFlakes() {
    const container = document.querySelector(".flakes");
    for (let i = 0; i < 60; i++) {
      const flake = document.createElement("div");
      flake.classList.add("flake");
      flake.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
      flake.style.width = 4 + Math.random() * 3 + "px";
      flake.style.height = 20 + Math.random() * 12 + "px";
      flake.style.left = Math.random() * 100 + "vw";
      container.appendChild(flake);
      flakeElements.push(flake); // simpan element
      // timeline jatuh
      const tl = gsap.timeline({
        repeat: -1,
        delay: Math.random() * 3
      });

      tl.fromTo(
        flake,
        {
          y: -50,
          rotation: Math.random() * 360
        },
        {
          y: "100vh",
          duration: 4 + Math.random() * 3,
          ease: "none"
        }
      );

      flakeTweens.push(tl);

      // zig-zag
      const zigzag = gsap.to(flake, {
        x: "+=" + (Math.random() * 100 - 50),
        duration: 0.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });

      flakeTweens.push(zigzag);

      // rotation
      const rotate = gsap.to(flake, {
        rotation: "+=" + (Math.random() * 360),
        duration: 2 + Math.random() * 2,
        repeat: -1,
        ease: "none"
      });

      flakeTweens.push(rotate);
    }
  }
  function stopFlakes() {
    // stop semua animasi
    flakeTweens.forEach(t => t.kill());

    // fade out biar halus
    gsap.to(flakeElements, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        flakeElements.forEach(el => el.remove());
        flakeElements = [];
        flakeTweens = [];
      }
    });
  }

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .map(char => {
      if (char === " ") return "&nbsp;";
      return char;
    })
    .join("</span><span>")}</span>`;
  const music = document.getElementById("bg-music");
  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.5, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "#26a36f"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.5, ideaTextTrans)
    .to(".idea-1", 0.5, ideaTextTransLeave, "+=1")
    .from(".idea-2", 0.5, ideaTextTrans)
    .to(".idea-2", 0.5, ideaTextTransLeave, "+=1")
    .from(".idea-3", 0.9, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "#ff69b4",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=0.8")
    .from(".idea-4", 0.4, ideaTextTrans)
    .to(".idea-4", 0.4, ideaTextTransLeave, "+=0.8")
    .from(
      ".idea-5",
      {
        duration: 0.7,
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      }
    )

    // jeda 0.2 detik
    .to(".idea-5 strong", {
      duration: 0.2,
      scale: 1.2,
      x: 10,
      backgroundColor: "#033768",
      color: "#fff",
      padding: "2px 25px",
      fontStyle: "italic",
      borderRadius: "5px"
    }, "+=0.1")

    // jeda 0.8 detik setelah strong selesai
    .fromTo(".idea-5 .smy img",
      {
        opacity: 0,
        scale: 0,
        y: 0
      },
      {
        opacity: 1,
        scale: 5,
        y: -100,
        duration: 1,
        ease: "back.out(3)"
      },
      "+=0.7"
    )
    .to(".idea-5 .smy", {
      x: "+=5",
      y: "+=5",
      repeat: 5,
      yoyo: true,
      duration: 0.1
    })
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=0.5"
    )
    .staggerFrom(
      ".idea-6 span",
      0.2,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.1
    )
    .staggerTo(
      ".idea-6 span",
      0.2,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=0.5"
    ).add(() => {
      music.currentTime = 14;
      music.volume = 0; // mulai dari mute
      music.play();

      // fade in volume
      gsap.to(music, {
        volume: 0.8, // target volume
        duration: 3, // durasi fade (detik)
        ease: "power1.inOut"
      });
    })
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )
    .from(
      ".mien-img",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
        duration: 1.5,
        onComplete: () => {
          // mulai goyang-goyang setelah masuk
          gsap.delayedCall(6, () => {
            gsap.set("#dance", { display: "block" });
            // animasi muncul + naik dikit
            gsap.to("#dance img", {
              y: -20,
              duration: 1,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: 0.2
            });
          })
          gsap.delayedCall(7, () => {
            // goyang
            gsap.to(".mien-img", {
              rotation: 2,
              x: "+=1",
              y: "+=1",
              duration: 0.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });

            // zoom in-out (lebih halus)
            gsap.to(".mien-img", {
              scale: 0.89,
              duration: 1.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          });
        }
      },
      "-=2"
    )
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        textShadow: "0px 0px 8px black",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
        onComplete: () => {
          gsap.delayedCall(2, () => {
            createFlakes();
          })
        }
      },
      "party"
    ).add(() => {
      gsap.to(".wish h5", {
        duration: 0.8,
        scale: 1.1,
        color: "hsl(random(0,360), 80%, 60%)",
        scale: 0.89,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".wish-hbd span", {
        y: -12,
        duration: 1.5,
        ease: "power1.inOut",
        scale: 1.1,
        color: "hsl(random(0,360), 80%, 60%)",
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true
        }
      });
    }).add(() => {
      function confettiBurst(x, y) {
        const container = document.createElement("div");
        container.classList.add("confetti-container");
        document.body.appendChild(container);
        for (let i = 0; i < 60; i++) {
          const confetti = document.createElement("div");
          confetti.classList.add("confetti");
          confetti.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
          // posisi awal dari titik (x, y)
          confetti.style.left = x + "px";
          confetti.style.top = y + "px";
          container.appendChild(confetti);
          const angle = Math.random() * Math.PI * 2;
          const distance = 200 + Math.random() * 300;
          gsap.to(confetti, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotation: Math.random() * 720,
            duration: 1.2,
            ease: "power3.out",
            onComplete: () => {
              gsap.to(confetti, {
                y: "+=800",
                x: "+=" + (Math.random() * 200 - 100),
                duration: 3,
                ease: "none"
              });
            }
          });
        }
        setTimeout(() => container.remove(), 5000);
      }
      function randomBurst() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5; // biar di atas layar
        confettiBurst(x, y);
      }
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            randomBurst();
          }, i * 550); 
        }
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              randomBurst();
            }, i * 550); 
          }
        }, 4000);
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              randomBurst();
            }, i * 550); 
          }
        }, 8000); 
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              randomBurst();
            }, i * 550); 
          }
        }, 12000); 
      }, 1500);

    }, "party")
    .staggerTo(
      ".eight svg",
      2,
      {
        visibility: "visible",
        opacity: 0,
        scale: 15,
        repeat: 3,
        repeatDelay: 0.5,
        ease: "power1.out"
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    }).add(() => { stopFlakes() })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  const wame = document.getElementById("wame");
  wame.addEventListener("click", () => {
    window.open("https://wa.me/+6289643190976?text=Mau ngetik apa hayo? :3");
  });
};

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      Object.keys(data).map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .getElementById(customData)
              .setAttribute("src", data[customData]);
          } else {
            document.getElementById(customData).innerText = data[customData];
          }
        }
      });
    });
};

import Swal from 'sweetalert2'


// resolveFetch().then(animationTimeline());
// trigger to play music in the background with sweetalert
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.style.display = "none";
  content.style.display = "block";
  function startSwal() {
    Swal.fire({
      title: "",
      width: "auto",
      padding: '10px',
      text: "Udah Nyalain Volume?",
      confirmButtonText: "Udah",
      cancelButtonText: "Belum",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "",
          width: "auto",
          padding: '10px',
          text: "Mulai?",
          confirmButtonText: "Mulai",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setTimeout(() => {
              animationTimeline();
            }, 300);
          }
        });
      } else {
        Swal.fire({
          imageUrl: "../img/hmph.gif",
          imageHeight: "120px",
          text: "Nyalain dlu volumenya lah weh!",
          width: "auto",
          padding: '10px',
          confirmButtonText: "Siap ku nyalain",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            startSwal(); // 🔁 balik ke awal
          }
        });
      }
    });
  }
  startSwal()
});
