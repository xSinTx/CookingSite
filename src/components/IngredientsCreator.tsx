import { Box, Input, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'

function IngredientsCreator({tags, setTags} : {tags: Array<string>, setTags: any}){

    function handleKeyDown(e: any){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index: number){
        setTags(tags.filter((x, i) => i !== index))
    }

    return (
        <Box w='100%'>  
            <Input placeholder='Type an ingredients' bg='white' onKeyDown={handleKeyDown} />
            <Box bg='rgba(255,255,255,0.4)' mt='8px' mb='8px' borderRadius='5px'>
                {tags.map((tag, index) => (
                    <Tag key={index} m='4px' bg='white'>
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton onClick={() => removeTag(index)} />
                    </Tag>
                ))}
            </Box>
        </Box>
    )
}

export default IngredientsCreator