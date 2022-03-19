var genUid_soup = '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
var genUid_soup = '0123456789'

export default function genUid() {
    var length = 10
    var soupLength = genUid_soup.length
    var id = []
    for (var i = 0; i < length; i++) {
      id[i] = genUid_soup.charAt(Math.random() * soupLength)
    }
    return id.join('')
}