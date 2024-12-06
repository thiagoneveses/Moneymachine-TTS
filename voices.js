const voicesList = {
  "Portuguese": {
    "Brazil": [
      { name: "pt-BR-FranciscaNeural", gender: "Female", styles: ["calm", "cheerful"] },
      { name: "pt-BR-AntonioNeural", gender: "Male", styles: ["news"] },
      { name: "pt-BR-LeticiaNeural", gender: "Female" },
      { name: "pt-BR-BrendaNeural", gender: "Female" },
      { name: "pt-BR-YaraNeural", gender: "Female" },
      { name: "pt-BR-ManuelaNeural", gender: "Female" }
    ],
    "Portugal": [
      { name: "pt-PT-FernandaNeural", gender: "Female" },
      { name: "pt-PT-RaulNeural", gender: "Male" },
      { name: "pt-PT-DuarteNeural", gender: "Male" }
    ]
  },
  "English": {
    "United States": [
      { name: "en-US-JennyMultilingualNeural", gender: "Female", styles: ["assistant", "chat", "newscast"] },
      { name: "en-US-GuyMultilingualNeural", gender: "Male", styles: ["newscast"] },
      { name: "en-US-AriaNeural", gender: "Female", styles: ["chat", "cheerful", "sad"] },
      { name: "en-US-DavisNeural", gender: "Male" },
      { name: "en-US-TonyNeural", gender: "Male" },
      { name: "en-US-AndrewMultilingualNeural", gender: "Male", styles: ["newscast", "cheerful", "sad"] },
      { name: "en-US-EmmaMultilingualNeural", gender: "Female", styles: ["chat", "cheerful"] }
    ],
    "United Kingdom": [
      { name: "en-GB-SoniaNeural", gender: "Female" },
      { name: "en-GB-RyanNeural", gender: "Male" },
      { name: "en-GB-LibbyNeural", gender: "Female" }
    ]
  },
  "Spanish": {
    "Spain": [
      { name: "es-ES-AlvaroNeural", gender: "Male" },
      { name: "es-ES-ElviraNeural", gender: "Female" },
      { name: "es-ES-AbrilNeural", gender: "Female" }
    ],
    "Mexico": [
      { name: "es-MX-JorgeNeural", gender: "Male" },
      { name: "es-MX-DaliaNeural", gender: "Female" }
    ]
  },
  "French": {
    "France": [
      { name: "fr-FR-DeniseNeural", gender: "Female" },
      { name: "fr-FR-HenriNeural", gender: "Male" }
    ],
    "Canada": [
      { name: "fr-CA-SylvieNeural", gender: "Female" },
      { name: "fr-CA-JeanNeural", gender: "Male" }
    ]
  },
  "German": {
    "Germany": [
      { name: "de-DE-KatjaNeural", gender: "Female" },
      { name: "de-DE-ConradNeural", gender: "Male" }
    ]
  },
  "Italian": {
    "Italy": [
      { name: "it-IT-ElsaNeural", gender: "Female" },
      { name: "it-IT-DiegoNeural", gender: "Male" }
    ]
  },
  "Japanese": {
    "Japan": [
      { name: "ja-JP-NanamiNeural", gender: "Female" },
      { name: "ja-JP-KeitaNeural", gender: "Male" }
    ]
  }
};

module.exports = voicesList;