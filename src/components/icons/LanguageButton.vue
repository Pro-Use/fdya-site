<template>
    <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="box transition" d="M46 46V61L1 61L1 16L16 16V0.999992L61 1L61 46L46 46Z" fill="black" stroke="#2086E3"/>
    </svg>
</template>
<style scoped lang="scss">

    svg{
        width: 100%;
        height: 100%;
    }

    .box{
        transform-origin: center center;
    }

    button:hover{
        .box{
            stroke: #B8F33A;
            transform: rotate(90deg);
        }
        .text{
            fill: #B8F33A
        }
    }

</style>
    