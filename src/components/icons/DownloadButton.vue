<template>
    <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="box transition" d="M46 1V16H55H61L61 61L1 61L0.999996 16H16L16 1L46 1Z" fill="black" stroke="#2086E3"/>
        <path class="text transition" d="M40.1609 38.5977H22V42.0028H40.1609V38.5977Z" fill="#80BFF9"/>
        <path class="text transition" d="M37.3235 29.5129L31.0807 36.8908L24.8379 29.5129H28.8106V21H33.3508V29.5129H37.3235Z" fill="#80BFF9"/>
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
            transform: rotate(180deg);
        }
        .text{
            fill: #B8F33A
        }
    }

</style>
    