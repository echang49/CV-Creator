export default function createSentence(array){
        let verb = "I excel in ";
        let noun = "I am good at ";
        let adj = "I am also ";
        for(let i of array){
            //if proper noun (propn), skip
            switch(i[1]){
                case 'NOUN':
                    if(noun === 'I am good at ') {
                        noun = noun.concat(i[0]);
                    }
                    else {
                        noun = noun.concat(', ').concat(i[0]);
                    }
                    break;
                case 'VERB':
                    if (verb === 'I excel in '){
                        verb = verb.concat(i[0])
                    }
                    else {
                        verb = verb.concat(', ').concat(i[0]);
                    }
                    break;
                case 'ADJ':
                    if (adj === 'I am also '){
                        adj = adj.concat(i[0])
                    }
                    else {
                        adj = adj.concat(', ').concat(i[0]);
                    }
                    break;
                default:
                    continue;
            }
        }
        verb = verb.replace(/,(?=[^,]*$)/, ', and').concat('. ');
        noun = noun.replace(/,(?=[^,]*$)/, ', and').concat('. ');
        adj = adj.replace(/,(?=[^,]*$)/, ', and').concat('. ');
        return [verb, noun, adj];
};