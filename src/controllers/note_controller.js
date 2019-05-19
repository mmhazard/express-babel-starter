import Note from '../models/note_model';

// createNote: super simple, takes in note fields, and returns the save promise (doesn’t need to create a new promise).
// getNotes: this one is a bit trickier, hence full code is here. Returns the promise created by find(). If you recall our datastructure was a dictionary by note id. We can use an accumulator to construct an object from the array of notes that find gives us.
// deleteNote: delete a note by its id
// updateNote: update note, pretty similar to how you did it for posts

export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = (id) => {
  // to quote Prof. Cormen: left as an exercise to the reader
  // remember to return the mongoose function you use rather than just delete
  return Note.findByIdAndRemove(id);
};

export const createNote = (fields) => {
  // you know the drill. create a new Note mongoose object
  // return .save()
  const note = new Note(fields);
  return note.save();
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
