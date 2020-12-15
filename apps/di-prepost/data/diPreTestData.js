const { surveyOptions } = require("./shared");

module.exports = {
  questions: {
    memory: {
      q1: {
        type: "mc",
        text: "Q1) Which do these results suggest students remember better?",
        options: [
          {
            value: "words",
            label: "Words"
          },
          {
            value: "pictures",
            label: "Pictures"
          },
          {
            value: "neither",
            label: "Neither (they remember words and pictures the same)"
          }
        ]
      },
      q2: {
        type: "textarea",
        text: "Q2) Please briefly explain why you said these results suggest that students remember PLACEHOLDER better.",
      },
      q3: {
        type: "survey",
        text: "Q3) How sure are you these results show students remember PLACEHOLDER better?",
        options: surveyOptions
      }
    },
    rockets: {
      q1: {
        type: "mc",
        text: "Q1) Which type of rocket do these results suggest flew higher?",
        options: [{
          value: "curved",
          label: "Curved"
        }, {
          value: "straight",
          label: "Straight"
        }, {
          value: "neither",
          label: "Neither (both rockets flew the same height)"
        }]
      },
      q2: {
        type: "textarea",
        text: "Q2) Please briefly explain why you said these results suggest that PLACEHOLDER rocket(s) flew higher."
      },
      q3: {
        type: "survey",
        text: "Q3) How sure are you these results show PLACEHOLDER rockets flew higher?",
        options: surveyOptions
      }
    }
  },
  scenes: {
    start: {
      edges: {
        next: "intro"
      },
      customEnterActions: [
        {
          name: "hideBtns",
          args: ["prev", "next"]
        }
      ]
    },
    intro: {
      edges: {
        prev: "start",
        next: "repetitive"
      }
    },
    repetitive: {
      edges: {
        prev: "intro",
        next: "memoryIntro1"
      }
    },
    memoryIntro1: {
      edges: {
        prev: "intro",
        next: "memoryIntro2"
      }
    },
    memoryIntro2: {
      edges: {
        prev: "memoryIntro1",
        next: "memoryIntro3"
      }
    },
    memoryIntro3: {
      edges: {
        prev: "memoryIntro2",
        next: "memoryIntro4"
      }
    },
    memoryIntro4: {
      edges: {
        prev: "memoryIntro3",
        next: "memoryIntro5"
      }
    },
    memoryIntro5: {
      edges: {
        prev: "memoryIntro4",
        next: "memoryIntro6"
      }
    },
    memoryIntro6: {
      edges: {
        prev: "memoryIntro5",
        next: "memoryIntro7"
      }
    },
    memoryIntro7: {
      edges: {
        prev: "memoryIntro6",
        next: "memoryResults1Intro"
      }
    },
    memoryResults1Intro: {
      edges: {
        prev: "memoryIntro7",
        next: "memoryResults1"
      }
    },
    memoryResults1: {
      sceneType: "memoryResults",
      edges: {
        prev: "memoryResults1Intro",
        next: "memoryResults2Intro"
      }
    },
    memoryResults2Intro: {
      edges: {
        prev: "memoryResults1",
        next: "memoryResults2"
      }
    },
    memoryResults2: {
      sceneType: "memoryResults",
      edges: {
        prev: "memoryResults2Intro",
        next: "memoryResults3Intro"
      }
    },
    memoryResults3Intro: {
      edges: {
        prev: "memoryResults2",
        next: "memoryResults3"
      }
    },
    memoryResults3: {
      sceneType: "memoryResults",
      edges: {
        prev: "memoryResults3Intro",
        next: "memoryResults4Intro"
      }
    },
    memoryResults4Intro: {
      edges: {
        prev: "memoryResults3",
        next: "memoryResults4"
      }
    },
    memoryResults4: {
      sceneType: "memoryResults",
      edges: {
        prev: "memoryResults4Intro",
        next: "memoryResults5Intro"
      }
    },
    memoryResults5Intro: {
      edges: {
        prev: "memoryResults4",
        next: "memoryResults5"
      }
    },
    memoryResults5: {
      sceneType: "memoryResults",
      edges: {
        prev: "memoryResults5Intro",
        next: "rocketsIntro1"
      }
    },
    rocketsIntro1: {
      edges: {
        prev: "memoryResults5",
        next: "rocketsIntro2"
      }
    },
    rocketsIntro2: {
      edges: {
        prev: "rocketsIntro1",
        next: "rocketsIntro3"
      }
    },
    rocketsIntro3: {
      edges: {
        prev: "rocketsIntro2",
        next: "rocketsIntro4"
      }
    },
    rocketsIntro4: {
      edges: {
        prev: "rocketsIntro3",
        next: "rocketsResults1Intro"
      }
    },
    rocketsResults1Intro: {
      edges: {
        prev: "rocketsIntro4",
        next: "rocketsResults1"
      }
    },
    rocketsResults1: {
      sceneType: "rocketsResults",
      edges: {
        prev: "rocketsResults1Intro",
        next: "rocketsResults2Intro"
      }
    },
    rocketsResults2Intro: {
      edges: {
        prev: "rocketsResults1",
        next: "rocketsResults2"
      }
    },
    rocketsResults2: {
      sceneType: "rocketsResults",
      edges: {
        prev: "rocketsResults2Intro",
        next: "rocketsResults3Intro"
      }
    },
    rocketsResults3Intro: {
      edges: {
        prev: "rocketsResults2",
        next: "rocketsResults3"
      }
    },
    rocketsResults3: {
      sceneType: "rocketsResults",
      edges: {
        prev: "rocketsResults3Intro",
        next: "rocketsResults4Intro"
      }
    },
    rocketsResults4Intro: {
      edges: {
        prev: "rocketsResults3",
        next: "rocketsResults4"
      }
    },
    rocketsResults4: {
      sceneType: "rocketsResults",
      edges: {
        prev: "rocketsResults4Intro",
        next: "rocketsResults5Intro"
      }
    },
    rocketsResults5Intro: {
      edges: {
        prev: "rocketsResults4",
        next: "rocketsResults5"
      }
    },
    rocketsResults5: {
      sceneType: "rocketsResults",
      edges: {
        prev: "rocketsResults5Intro",
        next: "completed"
      }
    },
    completed: {
      edges: {
        prev: "rocketsResults5"
      }
    }
  }
};
