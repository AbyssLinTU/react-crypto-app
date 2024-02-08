export const percentDifference=(a,b)=>{
    
    return +((b/a-1)*100).toFixed(2);
  }
export const capitalize=(str)=>{
    return str.charAt(0).toUpperCase()+ str.substr(1)
}