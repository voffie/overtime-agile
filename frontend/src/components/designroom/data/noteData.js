import deskImg from "@/assets/img/design-room/img/fm-desk-bg-white.png"
import postitImg from "@/assets/img/design-room/img/post-it.svg"
import riddle1 from "@/assets/img/design-room/img/riddle-1.svg"
import riddle2 from "@/assets/img/design-room/img/riddle-2.svg"
import riddle3 from "@/assets/img/design-room/img/riddle-3.svg"
import confession from "@/assets/img/design-room/img/confession.svg"

export const noteData = {
  "desk": {
    id: 1,
    imgPath: deskImg,
    imgAltText: "The desk of Frank miller with bunny head prototype, projector, post-it note and drawers with color slides",
    available: true
  },
  "postIt": {
    id: 2,
    imgPath: postitImg,
    imgAltText: "A yellow Post-It note with something scribbled on it poem password for laptop and server room",
    available: true
  },
  "riddle1": {
    id: 3,
    imgPath: riddle1,
    imgAltText: "Riddle about a color, presented as a poem on a background with a faint feather illustration.",
    available: false
  },
  "riddle2": {
    id: 4,
    imgPath: riddle2,
    imgAltText: "Riddle about a color, presented as a poem in white text on a black and gray gradient background. The design features a radiating starburst and stylized dandelion seed puffs scattered across the image, suggesting motion.",
    available: false
  },
  "riddle3": {
    id: 5,
    imgPath: riddle3,
    imgAltText: "Riddle about a color, presented as a poem centered within a heart outline on a bright yellow and white gradient background featuring crown and gem designs.",
    available: false
  },
  "confession": {
    id: 6,
    imgPath: confession,
    imgAltText: "Frank Miller confession and involvement in darker things",
    available: false
  }
}
