export const storyMap = {

  "Design Room Intro": {
    startStory: "You pick up the slide, it looks old, worn-out by time given a yellowish-white taint. Only one department would have something that would unveil the content of the slide...",
    endStory: "The design department, you march on towards it.",
    connectsTo: "Moving Towards the Dungeon",
    ctaButtonText: "Continue towards the Design Room",
    hasOverlaySlot: false,
    overlay: null,

  },
  "Moving Towards the Dungeon": {
    startStory: "As you move down the corridor, the office has a sudden change. The air is thicker, and the lack of natural light is evident.You have entered the so-called “office-dungeon,” where the design and server rooms live.",
    endStory: "Frankly, you never liked this part of the office. It always gave you the heebie-jeebies, and on top of that, the department managers gave an eerie discomfort ...especially Frank Miller.",
    connectsTo: "Entering the Dragon’s Nest",
    ctaButtonText: "Continue down the stairs",
    hasOverlaySlot: true,
    overlay: {
      imgPath: "/src/assets/img/design-room/img/corridor2.png",
      imgAlt: "A dark corridor that leads to some stairs",
      title: "The corridor",
      buttonTitle: "See corridor",
      soundPath: "/src/assets/sound/design-room/Walking.m4a",

    },

  },

  "Entering the Dragon’s Nest": {
    startStory: "You push open the door… to the Design Room -->",
    endStory: "Everywhere you look, there are desks covered with rulers, markers, and color-coded schematics. Bins overflow with rolled-up sheets of paper, and at the center of it all sits Frank Miller’s desk.",
    connectsTo: "Frank Miller’s Desk",
    ctaButtonText: "Walk to the desk",
    hasOverlaySlot: false,
    overlay: null,

  },

  "Frank Miller’s Desk": {
    startStory: "There are a few things around the desk that catch your eye: a guinea head from an old model, a post-it note with something scribbled on it, ",
    endStory: `... a drawer full of colored slides some of them labeled QISR and lastly, the thing you came for: the old, trusty projector.

Curiosity got the better of you, and you pick up the post-it note`,
    connectsTo: "The Post-it Note",
    ctaButtonText: "Mhh.. the note?",
    hasOverlaySlot: true,
    overlay: {
      imgPath: "/src/assets/img/design-room/img/fm-desk-bg-white.png",
      imgAlt: "Frank Millers desk with a bunch of stuff: projector,open drawer with colored slides, old prototype, coffee mug, and poster with colors and circles",
      title: "The Desk of a Manager",
      buttonTitle: "See Desk",
      soundPath: "",

    },

  },
  "The Post-it Note": {
    startStory: "You lift up the note .....",
    endStory: "You chuckle… only Frank could come up with such a roundabout way to store a simple password. You go back to your mission and refocus on the projector",
    connectsTo: "Project Obscura",
    ctaButtonText: "Start the projector",
    hasOverlaySlot: true,
    overlay: {
      imgPath: "/src/assets/img/design-room/img/post-it.svg",
      imgAlt: "Post-it note with message and riddle",
      title: "The Post-it",
      buttonTitle: "See Post-it",
      soundPath: "",

    },

  },
  "Project Obscura": {
    startStory: "You flick the projector switch .....",
    endStory: "and a crisp, whirring hum rings out as the gears engage to pull the new slide into place. Suddenly you feel a piercing gaze form the left..",
    connectsTo: "Follow the Rabbit Down the Hole",
    ctaButtonText: "Eww a.. bunny head?",
    hasOverlaySlot: true,
    overlay: {
      imgPath: "/src/assets/img/design-room/img/schematic.svg",
      imgAlt: "Elaborate schematics of bunny prototype where different colored slides can be inserted called QISR",
      title: "The failed project",
      buttonTitle: "See Slide projection",
      soundPath: "/src/assets/sound/design-room/DVD-trim.m4a",

    },

  },

  "Follow the Rabbit Down the Hole": {
    startStory: "So the rumors were true the failed 'Project Obscura'.\nA plan to sell ads directly into people’s homes.\n\n..You sigh with relief...\n",
    endStory: "At least now, Heartcore stands firmly for privacy, and the board from that era is long gone.\n\nThat gaze again… Why are you here?\n\nAgainst your better judgment, you touch the bunny’s head and feel an indent.\n\nYou flick a small lever.. and a beam of light bursts from its right eye.",
    connectsTo: "Start Puzzle",
    ctaButtonText: "Intro Completed",
    hasOverlaySlot: false,
    overlay: null,
  }

}
