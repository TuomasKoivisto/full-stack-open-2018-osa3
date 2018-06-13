const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://Tuomas:neljakolme1@ds159020.mlab.com:59020/fullstack-open-db'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
