// backend/seed/seedTerms.js
import sequelize from '../config/db.js';
import Terms from '../models/Terms.js';
import dotenv from 'dotenv';
dotenv.config();
const termsEn = [
  "By clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.",
  "You can use the program FOR FREE for 14 days.",
  "123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day.",
  "After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.",
  "You have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.",
  "If we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed.",
  "Billing is for one year at a time.",
  "The price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year's use of the program.",
  "When using the offer price of SEK 99, the one-year period is calculated from registration.",
  "All prices are excluding VAT.",
  "Offer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.",
  "Intermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us.",
  "The annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.",
  "The introductory offer (SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed: Start at 159 SEK/month, Remote Control at 300 SEK/month, and Pro at 333 SEK/month.",
  "If you choose to keep the program by not notifying us within 14 days of registration that you do not wish to continue, you accept that you will pay the invoice. Failure to pay the invoice or late payment does not cancel the order.",
  "License for the use of 123 Fakturera is of course sold in accordance with applicable laws.",
  "To help you and comply with legal requirements, we must store your information.",
  "We may send you offers and updates via email, post, or phone. You can opt out anytime by emailing us.",
  "You have full rights under GDPR: to access, change, delete, restrict, or object to processing your data.",
  "By clicking 'Invoice Now', you agree to all these terms. The registration timestamp is stored automatically.",
  "We hope you’ll love using our product like thousands of others already do. Have a great day!"
];

const termsSv = [
  "Genom att klicka på Fakturera Nu godkänner du registreringen enligt den information du har angett samt villkoren här.",
  "Du kan använda programmet GRATIS i 14 dagar.",
  "123 Fakturera är så enkelt och självförklarande att behovet av support är minimalt, men om du behöver hjälp finns vi här.",
  "Efter provperioden fortsätter abonnemanget och kostar 99 SEK exklusive moms per månad, fakturerat årligen.",
  "Du har rätt att avsluta användningen utan kostnad genom att meddela oss via e-post inom 14 dagar från registrering.",
  "Om vi inte får ett sådant meddelande inom 14 dagar kan beställningen inte ändras.",
  "Fakturering sker årsvis.",
  "Priset för 123 Fakturera (erbjudande 99 SEK/mån, ordinarie 159 SEK/mån) gäller årsavgiften för ett års användning.",
  "Vid användning av erbjudandet beräknas ettårsperioden från registreringen.",
  "Alla priser är exklusive moms.",
  "Erbjudanden som Lagerhantering, Medlemsfakturering, Fleranvändarversion och engelskt utskrift är tilläggsmoduler som kan beställas senare.",
  "Förmedling och fakturering kan ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Kundrelationen är alltid med oss.",
  "Årsavgiften förnyas automatiskt men kan avslutas 30 dagar innan nästa period börjar.",
  "Introerbjudandet (99 SEK/mån) gäller första året. Därefter gäller ordinarie priser: Start 159 SEK/mån, Remote 300 SEK/mån, Pro 333 SEK/mån.",
  "Om du inte meddelar oss inom 14 dagar att du inte vill fortsätta förbinder du dig att betala fakturan.",
  "Licensen för 123 Fakturera säljs enligt gällande lagar.",
  "För att kunna hjälpa dig och uppfylla lagkrav måste vi lagra din information.",
  "Vi kan skicka erbjudanden och uppdateringar via e-post, post eller telefon. Du kan när som helst välja att avregistrera dig.",
  "Du har fulla rättigheter enligt GDPR att få tillgång till, ändra, radera eller invända mot hur din data behandlas.",
  "Genom att klicka på 'Fakturera Nu' godkänner du dessa villkor. Registreringstidpunkt sparas automatiskt.",
  "Vi hoppas att du älskar vårt program lika mycket som tusentals andra redan gör. Ha en fantastisk dag!"
];

async function seedTerms() {
  try {
    await sequelize.sync({ alter: true });
    await Terms.destroy({ where: {} });

    const allTerms = [
      ...termsEn.map((text) => ({ language: 'en', text })),
      ...termsSv.map((text) => ({ language: 'sv', text })),
    ];

    await Terms.bulkCreate(allTerms);
    console.log('✅ Successfully seeded English and Swedish terms.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding terms:', err);
    process.exit(1);
  }
}

seedTerms();
