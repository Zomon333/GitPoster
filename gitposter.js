require("dotenv").config(); // Starts process with .env file

const { exec } = require("child_process");
const { Client, Intents, Guild } = require("discord.js"); //Defines Client and Intents
const process = require("process");

const client=new Client(
    {
        intents:[
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES
        ]
    }
);

client.once("ready",()=>{
    client.login(process.env.TOKEN);

    const webhookURL="1100305174624477204/5W70BLUKv_e-rDGAMpE0zY4Zp3FZYAnCMBmiii2cvFJchk8CaNmOe5kg0BanCTsbY7Cu";
    client.fetchWebhook(webhookURL).then((hook)=>{

        let milestone;
        let title;
        let due;

        let messageBuilder="";

        fetch("https://api.github.com/repos/zomon333/sadboat-engine/milestones?state=open&sort=due_on&direction=asc&per_page=1&page=1").then((result)=>{
            return result.json();
        }).then((result)=>{
            if(result.length==1)
            {    
                milestone=result[0].number;
                title=result[0].title;
                due=result[0].due_on;

                let apiCall = "https://api.github.com/repos/zomon333/sadboat-engine/issues?state=open&milestone=";
                apiCall+=milestone;
        
                messageBuilder+="***__[Milestone: "+title+"](<"+result[0].html_url+">)__***\n";
                messageBuilder+="*Due on: "+due+"*\n\n";

                fetch(apiCall).then((result)=>{
                    return result.json();
                }).then((result)=>{
                    messageBuilder+="There are currently "+result.length+" issues left in the milestone.\n\n";
                    result.map((r)=>{
                        messageBuilder+="__**[Issue number "+r.number+"; "+r.title+"](<"+r.html_url+">)**__\n";
                        messageBuilder+="*Assigned to "+r.user.login+"*\n";
                        // messageBuilder+="Link: "+r.html_url+"\n\n";
                    });
                    hook.send(messageBuilder);
                });
            }
            else
            {
                hook.send("**Failed to obtain milestone data.**");
            }
        })
    });



});

client.login(process.env.TOKEN).then(async ()=>{
    await new Promise( r => setTimeout(r, 2000));
    const killTask = "kill -9 "+process.pid;
    exec(killTask);
});


