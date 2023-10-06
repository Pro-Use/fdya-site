
<template>
    <header class="fixed top-0 left-0 w-screen grid grid-cols-header gap-5 z-[100] p-2.5 font-DMregular">
        <h1 class="col-start-2 bg-white h-12 border-solid border border-black shadow-default max-w-sm mx-auto leading-[44px]">
            <Vue3Marquee>
                <div>{{title}} </div>
            </Vue3Marquee>
        </h1>
        <button class="col-start-1 row-start-1 bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default">中文</button>
    </header>
</template>


<script setup>

const title ='FOR DATA YOU ARE, AND TO DATA YOU SHALL RETURN 对于你所/是的数据, 对于你应该/返回的数据 '

</script>