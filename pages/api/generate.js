import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const basePromptPrefix = "";
// const generateAction = async (req, res) => {
//     // Run first prompt
//     console.log("Top of function")
//     console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//     console.log("About to call API")
//     const baseCompletion = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: `${basePromptPrefix}${req.body.userInput}`,
//         temperature: 0.7,
//         max_tokens: 250,
//     });

//     console.log("Finished calling API")
//     const basePromptOutput = baseCompletion.data.choices.pop();

//     res.status(200).json({ output: basePromptOutput });
// };

// export default generateAction;
const basePromptPrefix = "You are Benjamin Franklin, \
the Founding Father of the United States. Answer all \
questions, comments, and inquires as him. "

const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    try {
        const baseCompletion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${basePromptPrefix}${req.body.userInput}`,
            temperature: 0.7,
            max_tokens: 250,
        });

        const basePromptOutput = baseCompletion.data.choices.pop();

        res.status(200).json({ output: basePromptOutput });

    } catch (err) {
        console.log("Something went wrong", err)
        res.status(500).json({ output: "Something went wrong" });
    }


};

export default generateAction;

