import { CopyBlock, dracula } from "react-code-blocks";

function handleCodeBlock(content){
    if(content.includes("```")){
        return content.split("```").map((block, i) => {
            if(block.includes("=") ||
                block.includes(";") ||
                block.includes("[") ||
                block.includes("]") ||
                block.includes("{") ||
                block.includes("}")
            ){
                const lang = block.split("\n")[0]
                return (
                        <CopyBlock
                        text={block}
                        language={lang}
                        showLineNumbers={true}
                        theme={dracula}
                        key={i}
                        />
                )
            } else {
                return(block)
            }
        })
        // return content.split("```").map(block => {
        //     return languages.map((language) => {
        //         const regx = new RegExp(language)
        //         if(regx.test(block)){
        //             return("code")
        //         }
        //     })
        // })
    } 
    else {
        return(content)
    }
}

export default handleCodeBlock