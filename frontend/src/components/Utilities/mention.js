export const Mention = (item) => {
 
    var tag = item.match(/(?:^|[ ])@([a-zA-Z]+[0-9])/gm)
        
    return (
        item.replace(tag, '<a href="#">'+tag+ '</a>')
    )
};
