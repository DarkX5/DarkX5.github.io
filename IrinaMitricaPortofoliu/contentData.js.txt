var contentFolders = {
    image: "./media/image/",
    audio: "./media/audio/",
    video: "./media/video/"
}

var contentData = {};

contentData.image = [
    {
        name: "Melting",
        link: "https://drive.google.com/file/d/1LPhP5Xkcu3ePmW1nHlejUj3aFC-gfjzj/view?usp=sharing",
        source: "https://lh3.googleusercontent.com/0kB6lpTmItXq0Q5gcNdF6S4K5a5CbZJmri1BUzy8AgT8Cn_UkynK9TARwz8",
        status: "Sold",
        price: "N/A",
        description: "ulei pe panza 40/40"
    },
    {
        name: "Mind control",
        link: "https://drive.google.com/file/d/11iqsRkVFU9gCDX3xiAYYoVrg1wmEC4Fg/view?usp=sharing",
        source: "https://lh6.googleusercontent.com/U2ukJaFjPyhgrGCcE0awNbItjkua_o6KVlhJaAlA9tiv642Ek8BMxyiBD9Q",
        status: "Available for purchase",
        price: "1200 RON",
        description: "ulei pe panza 40/70"
    },
    {
        name: "Evolutionary Beauty",
        link: "https://drive.google.com/file/d/1NhOx7d5QIT13eQFsMMZJVgqf0GcFay77/view?usp=sharing",
        source: "https://lh4.googleusercontent.com/AJ2HAIQZ5WRmGgPJuH6e9tlIqVAcI06n84Jc_Q2rfQpCSFBGjUMCFs4_BcI",
        status: "Sold",
        price: "N/A",
        description: "ulei pe panza 40/40"
    },
    {
        name: "The Hunt",
        link: "https://drive.google.com/file/d/1TGM5hs7RXocD8ZDNxPJwIaLNtH_0PwEC/view?usp=sharing",
        source: "https://lh4.googleusercontent.com/7iESRCC50hDqpaahRZm7svLD80ogL3tl9X1XSUGPS54Gd_EvvsapA6E92Co",
        status: "Available for purchase",
        price: "1000 RON",
        description: "ulei pe panza 40/70"
    },
    {
        name: "Dragonfly",
        link: "https://drive.google.com/file/d/1FB7gO9TMzgCsVWd9yrZHLEf4A3ttyNul/view?usp=sharing",
        source: "https://lh4.googleusercontent.com/2J1NBYivUSRICMqhFiw3rwkPwIJN0b1sX066xMBCFY3651b-N_8W5suFJYA",
        status: "Available for purchase",
        price: "600 RON",
        description: "ulei pe panza 40/40"
    },
    {
        name: "Cycle",
        link: "https://drive.google.com/file/d/18ZXqVkQnJD2cwwsVt3mgCB75U1mBWUZo/view?usp=sharing",
        source: "https://lh4.googleusercontent.com/yaA1MAxO4uarJDlDRpIdVlHCctEd_YNqBBik9BXHwywKozdobLMI71eysWo",
        status: "Available for purchase",
        price: "300 RON",
        description: "ulei pe lemn 30/40"
    },
    {
        name: "Turtle",
        link: "https://drive.google.com/file/d/1smc885Px5RtqRYABvFg47F8RRtenBWsx/view?usp=sharing",
        source: "https://lh6.googleusercontent.com/OnC56Gd-GHwaMnzw30FWR2cjXDmADNm_UeDO5yB8Z5_WQa46gB_h4cP2CNY",
        status: "Available for purchase",
        price: "800 RON",
        description: "ulei pe panza 40/30"
    },
    {
        name: "Serenity",
        link: "https://drive.google.com/file/d/1FBaNSYjSPO5LwpTUvq_TMTspfKhp1EVl/view?usp=sharing",
        source: "https://lh6.googleusercontent.com/c69b-PcijegI6STg-4wJjD93kUzfrxwLpcUHJcsuCW24PLwPsv4D_GqaXOA",
        status: "Sold",
        price: "N/A",
        description: "ulei pe panza 70/40"
    },
    {
        name: "Second Chaos",
        link: "https://drive.google.com/file/d/1Vb802uIYa21gg8p5w9oZYpYPzQ2WctBF/view?usp=sharing",
        source: "https://lh5.googleusercontent.com/lGxDcbnms1nB4MCNz6FXSqySMSCHwCseo8m3FcVJmNeIfLaC6P-m3rCTMDk",
        status: "Available for purchase",
        price: "1000 RON",
        description: "ulei pe panza 50/50"
    },
    {
        name: "For the minds of the very few",
        link: "https://drive.google.com/file/d/1IxRJcobO_-GhVD8zjZuUc_V7Vk5wZK4k/view?usp=sharing",
        source: "https://lh4.googleusercontent.com/xBb-2FDVPyWBqFzqR8Z6AlLnVt-LtkiziQLzd8ALwfrCrtBsJwtKSeKWmC4",
        status: "Available for purchase",
        price: "1700 RON",
        description: "ulei pe panza 35/40"
    },
    {
        name: "Fusion",
        link: "https://drive.google.com/file/d/17gxcq870Qbr0xGROUIkp-N4HhBizHDLz/view?usp=sharing",
        source: "https://lh5.googleusercontent.com/JkSebK4iboKD5fOW3srFPXJb--TT-r_UQ58YdIqZCFRgLWtLZloq_mBxRSM",
        status: "Sold",
        price: "N/A",
        description: "ulei pe panza 35/45"
    },
    {
        name: "Abstract Yang",
        link: "https://drive.google.com/file/d/1sqfTvQkr-XpIP1sHlVuAY2HTrO8laj27/view?usp=sharing",
        source: "https://lh4.googleusercontent.com/1AMONZeWdj8vn9fQ09p18F9uaKMr-KFn8oHk1erHZnN_ulh20du62ovXRhA",
        status: "Sold",
        price: "N/A",
        description: "ulei pe panza 30/30"
    },
];

contentData.video = [
    {
        name: "The Chase pt. 1",
        sourcecover: "theChasePart1Cover.jpg",
        sourcevideo: "https://www.youtube.com/embed/orIUTw0bPRA",
        status: "In development",
        description: "the chase part 1"
    }
]