class Name {
  rootName: { name: string; languages: string[] };
  variantNames: Array<{ name: string; languages: string[] }>;
  petNames: Array<{ name: string; languages: string[] }>;

  constructor(rootName: string, languages: string[]) {
    this.rootName = { name: rootName, languages: languages };
    this.variantNames = [];
    this.petNames = [];
  }

  // Method to add a sub-name with its languages
  addVariantNameWithLanguages(variantName: string, languages: string[]): void {
    this.variantNames.push({
      name: variantName,
      languages: languages
    });
  }

  // Method to add a sub-name with its languages
  addPetNameWithLanguages(petName: string, languages: string[]): void {
    this.petNames.push({
      name: petName,
      languages: languages
    });
  }

  // Method to select a name for a person
  selectName(name: string): string {
    const foundVariantName = this.variantNames.find(variantNameObj => variantNameObj.name === name);
    const foundPetName = this.petNames.find(petNameObj => petNameObj.name === name);
    if (foundVariantName) {
      return foundVariantName.name;
    } else if (foundPetName) {
      return foundPetName.name;
    } else if (name === this.rootName.name) {
      return this.rootName.name;
    } else {
      throw new Error('Invalid name selection. Please choose either the rootName or a variantName.');
    }
  }

  // Method to get languages of a sub-name
  getLanguagesOfName(name: string): string[] {
    const foundVariantName = this.variantNames.find(variantNameObj => variantNameObj.name === name);
    const foundPetName = this.petNames.find(petNameObj => petNameObj.name === name);
    if (foundVariantName) {
      return foundVariantName.languages;
    } else if (foundPetName) {
      return foundPetName.languages;
    } else if (name === this.rootName.name) {
      return this.rootName.languages;
    } else {
      throw new Error('Sub-name not found.');
    }
  }
}

// Example usage
const johannes = new Name('Johannes', ['German', 'Dutch', 'Danish', 'Swedish', 'Norwegian']);
johannes.addVariantNameWithLanguages('John', ['English']);
johannes.addVariantNameWithLanguages('Hans', ['German', 'Dutch', 'Danish', 'Swedish', 'Norwegian']);
johannes.addVariantNameWithLanguages('Jan', ['Dutch', 'Danish', 'Swedish', 'Norwegian']);
johannes.addVariantNameWithLanguages('Jon', ['English', 'Danish', 'Swedish', 'Norwegian']);
johannes.addVariantNameWithLanguages('Jens', ['Danish', 'Swedish', 'Norwegian', 'Icelandic']);

const anleifr = new Name('Anleifr', ['Old Norse']);
anleifr.addVariantNameWithLanguages('Áleifr', ['Old Norse']);
anleifr.addVariantNameWithLanguages('Anláf', ['Old English']);
anleifr.addVariantNameWithLanguages('Olaifr', ['Old Norse']);
anleifr.addVariantNameWithLanguages('Oluf', ['Old Danish', 'Old Swedish', 'Danish', 'Swedish', 'Norwegian']);
anleifr.addVariantNameWithLanguages('Olav', ['Old Danish', 'Old Swedish', 'Danish', 'Swedish', 'Norwegian']);
anleifr.addPetNameWithLanguages('Ole', ['Danish', 'Norwegian']);
anleifr.addPetNameWithLanguages('Ola', ['Swedish']);

// Creating a person and assigning a name
const person = {
  name: johannes.selectName('Johannes') // This will set the person's name to 'Johannes'
};

console.log(person.name); // Output: Johannes

// Getting languages of a sub-name
console.log(johannes); // Output: [ 'German', 'Dutch', 'Danish', 'Swedish', 'Norwegian' ]
console.log(anleifr.getLanguagesOfName('Ole')); // Output: [ 'Old Danish', 'Norwegian' ]