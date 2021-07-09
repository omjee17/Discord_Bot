require('dotenv').config()


const Discord=require('discord.js')
const client=new Discord.Client({
    partials:['MESSAGE']
})
const fetch=require('node-fetch')


client.on('ready',()=>{
    console.log("Our bot is ready to go!!!");
})

const BOT_PREFIX='!'
const MOD_ME_COMMAND='mod-me'
const WELCOME_COMMAND='hello'
const MOTIVATE_ME_COMMAND='inspire'
const DANCE_COMMAND='dance'
const PUNCH_COMMAND='punch'
const SLAP_COMMAND='slap'
const LAUGH_COMMAND='laugh'

client.on('message',msg=>{
    if(msg.content === `${BOT_PREFIX}${MOD_ME_COMMAND}`){
       modUser(msg.member)
    }
    if(msg.content === `${BOT_PREFIX}${WELCOME_COMMAND}`){
        welcomeUser(msg)
    }

    if(msg.content === `${BOT_PREFIX}${MOTIVATE_ME_COMMAND}`){
        getMotivationalQuote()
        .then(quote=>{
            msg.channel.send(quote)
        })
    }
    if(msg.content === `${BOT_PREFIX}${DANCE_COMMAND}`){
        getGIF('dance')
        .then(data=>{
            msg.channel.send(data)
        })
    }
    if(msg.content === `${BOT_PREFIX}${PUNCH_COMMAND}`){
        getGIF('punch')
        .then(data=>{
            msg.channel.send(data)
        })
    }
    if(msg.content === `${BOT_PREFIX}${SLAP_COMMAND}`){
        getGIF('slap')
        .then(data=>{
            msg.channel.send(data)
        })
    }
    if(msg.content == `${BOT_PREFIX}${LAUGH_COMMAND}`){
        getGIF('laugh')
        .then(data=>{
            msg.channel.send(data)
        })
    }





   
})

function getMotivationalQuote(){
    return fetch("https://zenquotes.io/api/random")
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        return data[0]["q"]+' - '+data[0]["a"]
    })
}


function getGIF(Query){
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=`+Query)
    .then(res=>{
        return res.json()
    })
    .then(res=>{
        let minimum=0,maximum=50
        let index=Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        return (res.data[index].images.original.url);
    })
   
}

function welcomeUser(msg){
    msg.reply("Hello!Nice to see you here")
}

function modUser(member){
    member.roles.add("862785765812994079")
}


client.login(process.env.BOT_TOKEN)
