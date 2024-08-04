import * as dotenv from 'dotenv'
dotenv.config()

import {OpenAI } from "openai"
const openAI=new OpenAI()

const response=openAI.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages:[
        {
            role: "user",
            content:[
                {
                    type:"text",
                    text:"what is the name of item in this image"
                },{
                    type:"image_url",
                    image_url:{
                        url:"",
                        detail:"low"
                    }
                }
            ]
        }
    ]
})