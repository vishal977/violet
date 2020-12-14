const{ botID } = require('./config.json')

module.exports = {
    randomArrayElement(array) {
        return array[Math.floor(Math.random() * array.length)];
  },

  mentionedUserIsSelf(user) {
      return user.id === botID
  },

  stringToArray(inputString) {
      var arr = inputString.split(' ')
      return arr
  },

  arrayToString(inputArray) {
      var str = '';
      for(let val of inputArray) {
          str += `${val} `
      }
      return str.trim()
  },

  isARole(inputRole, guild) {
    const foundRole = guild.roles.cache.find(role=> role.name === inputRole)
    if(foundRole)
        return foundRole
    else 
        return false
  },

  isYoutubeURL(inputURL) {
    const youtubeURLPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    return youtubeURLPattern.test(inputURL)
  },

  isYoutubePlaylist(inputURL) {
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    return playlistPattern.test(inputURL)
  },

  convertSecondsToMins(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 0 ? m + ":" : "";
    var sDisplay = s > 0 ? (s<10 ? "0" + s : s) : "";
    return hDisplay + mDisplay + sDisplay; 
  },

  base64ToUTF8(inputBuffer) {
    var utf8 = Buffer.from(inputBuffer, 'base64').toString('utf8')
    return utf8
  },

  shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {  
        var j = Math.floor(Math.random() * (i + 1)); 
                     
        var temp = array[i]; 
        array[i] = array[j]; 
        array[j] = temp; 
    }     
    return array; 
 } 

}