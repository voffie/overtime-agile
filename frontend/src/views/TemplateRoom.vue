<script setup>
import Button from "@/components/Button.vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"
import TemplateChild from "@/components/template/TemplateChild.vue"
</script>

<template>
  <PuzzleContainer nextRoute="/">
    <!-- Desktop -->
    <template #puzzleIntro>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ante sapien, gravida sed nulla
        sed, tempus pretium lectus. Ut quis rutrum est. Praesent sed nibh ante. Curabitur in tortor
        placerat, condimentum lectus ac, tincidunt sapien. Aenean in rutrum libero. Aenean non
        ornare nisi. Maecenas ante nulla, pretium non dapibus et, vulputate et neque. Nunc dignissim
        arcu euismod dolor scelerisque, ac auctor elit efficitur. Proin hendrerit nulla vitae quam
        tempus dapibus. Duis accumsan arcu in tellus fringilla, nec placerat elit euismod. Quisque
        nec magna id odio interdum ultrices. Ut dolor ante, euismod sit amet lacus ac, pharetra
        sollicitudin ligula. Sed feugiat varius fringilla. Interdum et malesuada fames ac ante ipsum
        primis in faucibus.

        Ut quis luctus risus. Sed malesuada nisl nec mauris ultrices consectetur. Nam eu semper
        lectus, sed rhoncus sem. Curabitur at consequat libero. Quisque venenatis augue id tincidunt
        dignissim. Nullam dapibus dolor vitae nibh congue maximus. Donec pulvinar scelerisque
        tellus, sed pretium neque congue in. Nullam ultrices faucibus aliquam. Etiam risus libero,
        congue vel interdum sed, fringilla in nibh. Nulla imperdiet condimentum eleifend.

        Donec nisl massa, mattis a gravida et, varius eu velit. Donec ut auctor nulla. Aenean
        rhoncus vulputate arcu, in aliquet tellus gravida vel. Suspendisse sed diam bibendum, ornare
        dolor a, pharetra nisl. Proin eget augue sit amet orci tincidunt faucibus. In aliquam
        tincidunt rutrum. Phasellus tempor convallis leo eu pellentesque. Phasellus fermentum nisi
        sapien, quis molestie arcu tincidunt consequat. Suspendisse vitae enim nec quam dapibus
        lacinia. Curabitur pretium faucibus enim porttitor tristique. Orci varius natoque
        penatibus.</p>
    </template>
    <template #puzzleImpl="{completed}">
      <TemplateChild :solve="completed" />
      <Button text="Parent Button" @click="completed()" />
    </template>
    <template #puzzleOutro>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat mollis erat. Nullam
        fringilla nisl ac sapien tempor, nec interdum nunc blandit. Fusce sodales sagittis dolor,
        pharetra elementum orci vehicula vitae. Sed enim odio, viverra sit amet risus in, semper
        suscipit erat. Integer vulputate ultricies urna, ac molestie augue convallis ac. Sed
        porttitor magna in orci tempus faucibus a vitae turpis. Etiam tincidunt dolor commodo,
        volutpat purus vitae, gravida justo. Integer at ex lorem. Proin diam lacus, ultrices vitae
        pellentesque et, tincidunt ac sem. Proin.</p>
    </template>
  </PuzzleContainer>
</template>
