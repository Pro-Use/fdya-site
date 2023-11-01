<template>
    <ul class="skip-links absolute top-[-10000px]">
        <li>
            <a href="#main" ref="skipLinkMain" class="skip-link">Skip to main content</a>
        </li>
    </ul>
</template>

<script setup>
/*
================================================================
ACCESSIBILITY
================================================================
*/
import { useRoute } from 'vue-router'
import { ref, provide, onMounted, watch } from 'vue';
import { useStateStore } from '../stores/state'

const state = useStateStore()
const route = useRoute()
const skipLinkMain = ref()

watch(
  () => route.path,
  () => {
    skipLinkMain.value.focus()
  }
)


let keyboardNav = false;
let lastFocus = document.querySelector('a');
let returnFocus;

(function () {
    'use strict';

    function keyboardFocus (e) {
        if (e.keyCode !== 9) {
            return;
        }

        switch (e.target.nodeName.toLowerCase()) {
            case 'input':
            case 'select':
            case 'textarea':
                break;
            default:
                document.documentElement.classList.add('keyboard-focus');
                // document.removeEventListener('keydown', keyboardFocus, false);
                keyboardNav = true;
                state.navIntent = 'keyboard'
        }
    }

    function mouseMove (e){
        keyboardNav = false;
        state.navIntent = 'mouse'
    }

    document.addEventListener('keydown', keyboardFocus, false);
    document.addEventListener('mousemove', mouseMove, false);
})();


</script>

<style lang="scss">

    [data-intent='keyboard'] {
        .skip-link:focus{
            position: fixed;
            top: 32px;
            left: 50%;
            transform: translateX(-50%);
            padding: 16px;
            background-color: white;
            z-index: 500;
        }
    }
        


</style>