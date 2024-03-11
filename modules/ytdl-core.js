const https = require('https');
const ytdl = require('ytdl-core');

const mp4Qualities = {
'144p': 133,
'240p': 134,
'360p': 135,
'480p': 136,
'720p': 137,
'1080p': 160,
'1440p': 248,
'2160p': 278,
}
const mp3Bitrates = {
  '48kbps': 140,
  '128kbps': 141,
  '256kbps': 249,
  '320kbps': 250,
};

 
async function getDownloadUrl(url, quality, fileType) {
    try {
      const videoInfo = await ytdl.getInfo(url);
      let format;
  
      if (fileType === 'mp3') {
        format = videoInfo.formats.find(
          (format) => format.itag === mp3Bitrates[quality] && format.mimeType.startsWith('audio/')
        );
      } else {
        format = videoInfo.formats.find((format) => format.itag === mp4Qualities[quality]);
        if (format && format.container !== 'mp4') {
          format = null;
        }
      }
  
      if (!format) {
        if (fileType === 'mp4') {
          const availableQualities = videoInfo.formats
            .filter((format) => format.container === 'mp4')
            .map((format) => format.itag)
            .map((itag) => mp4Qualities[itag])
            .filter((quality) => quality !== undefined);
          console.error(`MP4 video with quality(ies) ${availableQualities.join(', ')} available for the video ${url}`);
        } else if (fileType === 'mp3') {
          const availableBitrates = videoInfo.formats
            .filter((format) => format.mimeType.startsWith('audio/mpeg'))
            .map((format) => format.bitrate)
            .filter((bitrate) => bitrate !== undefined)
            .map((bitrate) => (bitrate / 1000) + ' kbps');
          console.error(`MP3 audio with bitrate(s) ${availableBitrates.join(', ')} available for the video ${url}`);
        } else {
          console.error(`${fileType} with quality ${quality} not found for the video ${url}`);
        }
        return;
      }
      return format.url;
    } catch (error) {
      console.error(`Error while fetching video info: ${error.message}`);
    }
  }   

/* const url = 'https://www.youtube.com/watch?v=x_g8M3fuFoc';
const quality = '256kbps';
const fileType = 'mp3';

getDownloadUrl(url, quality, fileType).then((downloadUrl) => {
  if (downloadUrl) {
    console.log(`Download URL: ${downloadUrl}`);
  }
}); */

module.exports = {
    ec: getDownloadUrl
}