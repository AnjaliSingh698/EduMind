import Subject from "../Models/subject.js";

// Create Subject
export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Subject name is required" });
    }
    //  Check duplicate
    const cleanedName = name.trim().toLowerCase();
    
    const existing = await Subject.findOne({ name: name.trim().toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const subject = await Subject.create({ name: cleanedName });

    res.status(201).json(subject);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating subject" });
  }
};


// Get All Subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 }); // ✅ better UX
    res.json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching subjects" });
  }
};