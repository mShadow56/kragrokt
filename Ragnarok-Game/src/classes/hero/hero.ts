
class Hero {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    occupation: string;
    background: string;
    id: string;
    exists: boolean;
    xp: number;
    level: number;
    stats: Stats;
    substats: SubStats;
    statPointsTotal: number;
    statPointsSpent: number;
    statPointsAvailable: number;
    skills: Record<string, Skill>;
    inParty: boolean;
    onQuest: boolean;
    
    constructor(
        firstName: string,
        lastName: string,
        gender: string,
        age: number,
        occupation: string,
        background: string,
        id: string,
        exists: boolean
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.stats = {
            con: 0,
            int: 0,
            str: 0,
            dex: 0,
            wis: 0,
        };
        this.occupation = occupation;
        this.background = background;
        this.id = id;
        this.exists = exists;

        this.xp = (this.age - 15) * 100;
        this.level = 1 + Math.floor(this.xp/1000);
        this.substats = {
            hp: 0,
            mp: 0,
            atk: 0,
            def: 0,
            wlp: 0,
        };
        this.statPointsTotal = 5 + 2 * this.level;
        this.statPointsSpent = 0;
        this.statPointsAvailable = this.statPointsTotal - this.statPointsSpent;
        this.skills = {
            fishing: {
                xp: 0,
                lvl: 0,
            },
            hunting: {
                xp: 0,
                lvl: 0,
            },
            cooking: {
                xp: 0,
                lvl: 0,
            },
            farming: {
                xp: 0,
                lvl: 0,
            },
            brewing: {
                xp: 0,
                lvl: 0,
            },
            gathering: {
                xp: 0,
                lvl: 0,
            },
            woodcutting: {
                xp: 0,
                lvl: 0,
            },
            fletching: {
                xp: 0,
                lvl: 0,
            },
            mining: {
                xp: 0,
                lvl: 0,
            },
            smithing: {
                xp: 0,
                lvl: 0,
            },
        };

        this.inParty = false;
        this.onQuest = false;
    }
}

function updateLevel(hero: Hero) {
    hero.level = 1 + Math.floor(hero.xp/1000);
}

function updateSubstats(hero: Hero) {
    hero.substats = {
        hp: Math.floor(10 + hero.stats.con * 4 + 1.0 * hero.level),
        mp: Math.floor(10 + hero.stats.int * 4 + 1.0 * hero.level),
        atk: Math.floor(10 + hero.stats.str * 2 + 0.5 * hero.level),
        def: Math.floor(10 + hero.stats.dex * 2 + 0.5 * hero.level),
        wlp: Math.floor(10 + hero.stats.wis * 2 + 0.5 * hero.level),
    };
}

function updateStatPointsTotal(hero: Hero) {
    hero.statPointsTotal = 5 + 2 * hero.level;
}

function updateStatPointsAvailable(hero: Hero) {
    hero.statPointsAvailable = hero.statPointsTotal - hero.statPointsSpent;
}

function updateSkills(hero: Hero) {
    if (hero === undefined) {
        return;
    }
    let baseXP = 100; // Starting XP for level 1

    for (let skillObj of Object.values(hero.skills)) {
        let lvl = 0;
        let totalXpToLvl = baseXP;
        while (skillObj.xp >= totalXpToLvl) {
            lvl ++;
            let xpToLvl = baseXP * Math.pow(1.25, lvl);
            totalXpToLvl += xpToLvl;
        }
        skillObj.lvl = lvl;
    }
}



const namesMen = [
    "Asbjørn",
    "Axel",
    "Bjarke",
    "Bjarne",
    "Bjørn",
    "Birger",
    "Børge",
    "Ejner",
    "Egon",
    "Erik",
    "Halfdan",
    "Harald",
    "Hermann",
    "Hjalmar",
    "Hjalte",
    "Holger",
    "Håkon",
    "Iver",
    "Karl",
    "Kjell",
    "Knud",
    "Njall",
    "Njord",
    "Odder",
    "Olav",
    "Ole",
    "Oluf",
    "Orm",
    "Ove",
    "Ragner",
    "Rikulf",
    "Robert",
    "Rolf",
    "Rørik",
    "Saxe",
    "Skjalm",
    "Stig",
    "Svenn",
    "Sæmund",
    "Tjodulv",
    "Torbjørn",
    "Tor",
    "Tore",
    "Torkel",
    "Ubbe",
    "Ulf",
    "Ulfrik",
    "Valdemar",
    "Vilhjelm",
    "Villum",
    "Ømund",
    "Øvind",
    "Åge",
]

const namesWomen = [
    "Alfhilde",
    "Alma",
    "Asa",
    "Astrid",
    "Birgitte",
    "Bothilde",
    "Dagmar",
    "Dagny",
    "Estrid",
    "Helga",
    "Ida",
    "Ingeborg",
    "Kraka",
    "Magnhild",
    "Mathilde",
    "Margrethe",
    "Rigmor",
    "Selma",
    "Sigfrid",
    "Signe",
    "Sigrid",
    "Svanhild",
    "Thora",
    "Thorvi",
    "Tove",
    "Ulfhild",
    "Ulla",
    "Yrsa",
    "Ædelfryd",
    "Åse",
]

export {
    Hero,
    updateLevel,
    updateSubstats,
    updateStatPointsTotal,
    updateStatPointsAvailable,
    updateSkills,
    namesMen,
    namesWomen
};