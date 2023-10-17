
<template>
    <header id="header" class="fixed top-0 left-0 w-screen grid grid-cols-header gap-5 z-[100] p-2.5 font-DMregular">
        <!-- <h1 class="col-start-2 bg-white h-12 border-solid border border-black shadow-default max-w-sm mx-auto leading-[44px] lg:fixed lg:top-8 lg:left-1/2 lg:translate-x-[-50%] lg:rounded-lg">
            <Vue3Marquee>
                <div class="px-1">{{title}} </div>
            </Vue3Marquee>
        </h1> -->
        <router-link 
            to="/info"
            class="
            block flex items-center justify-center col-start-3 row-start-1 bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow
            lg:fixed lg:top-8 lg:right-8 lg:w-[96px] lg:rounded-lg
            ">
            <span class="sr-only">About the exhibition</span>
			<span aria-hidden="true">INFO</span>
        </router-link >
        <button
            class="col-start-1 row-start-1 bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow 
            lg:fixed lg:top-[96px] lg:right-8 lg:w-[96px] lg:rounded-lg
            ">
            <span class="sr-only">Change Language</span>
			<span aria-hidden="true">中文</span>
        </button>
    </header>
</template>


<script setup>

const title ='FOR DATA YOU ARE, AND TO DATA YOU SHALL RETURN 对于你所是的数据, 对于你应该返回的数据 '

</script>