import React from "react";
import { Container, ListGroup, Table } from "react-bootstrap";

const textStyle = { textAlign: "left" };

export const Resting = () => {
  return (
    <Container>
      <h3>Resting</h3>
      <div style={textStyle}>
        <ListGroup>
          <ListGroup.Item>
            <p>
              Heroic though they might be, Adventurers can’t spend every hour of
              the day in the thick of Exploration, Social Interaction, and
              Combat. They need rest—time to sleep and eat, tend their wounds,
              refresh their minds and spirits for Spellcasting, and brace
              themselves for further adventure.
            </p>
            <p>
              Adventurers can take Short Rests in the midst of an Adventuring
              day and a Long Rest to end the day.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Short Rest</h5>
            <p>
              A Short Rest is a period of Downtime, at least 1 hour long, during
              which a character does nothing more strenuous than eating,
              drinking, reading, and tending to wounds.
            </p>
            <p>
              A character can spend one or more Hit Dice at the end of a Short
              Rest, up to the character’s maximum number of Hit Dice, which is
              equal to the character’s level. For each Hit Die spent in this
              way, the player rolls the die and adds the character’s
              Constitution modifier to it. The character regains Hit Points
              equal to the total. The player can decide to spend an additional
              Hit Die after each roll. A character regains some spent Hit Dice
              upon finishing a Long Rest, as explained below.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Long Rest</h5>
            <p>
              A Long Rest is a period of extended Downtime, at least 8 hours
              long, during which a character sleeps or performs light activity:
              reading, talking, eating, or standing watch for no more than 2
              hours. If the rest is interrupted by a period of strenuous
              activity—at least 1 hour of walking, Fighting, casting Spells, or
              similar Adventuring activity—the Characters must begin the rest
              again to gain any benefit from it.
            </p>
            <p>
              At the end of a Long Rest, a character regains all lost Hit
              Points. The character also regains spent Hit Dice, up to a number
              of dice equal to half of the character’s total number of them
              (minimum of one die). For example, if a character has eight Hit
              Dice, he or she can regain four spent Hit Dice upon finishing a
              Long Rest.
            </p>
            <p>
              A character can’t benefit from more than one Long Rest in a
              24-hour period, and a character must have at least 1 hit point at
              the start of the rest to gain its benefits.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Between Adventures</h5>
            <p>
              Between trips to Dungeons and battles against ancient evils,
              Adventurers need time to rest, recuperate, and prepare for their
              next adventure. Many Adventurers also use this time to perform
              other tasks, such as Crafting Arms and Armor, performing Research,
              or spending their hard-earned gold.
            </p>
            <p>
              In some cases, the Passage of time is something that occurs with
              little fanfare or description. When starting a new adventure, the
              GM might simply declare that a certain amount of time has passed
              and allow you to describe in general terms what your character has
              been doing. At other times, the GM might want to keep track of
              just how much time is passing as events beyond your Perception
              stay in motion.
            </p>
            <h5>Lifestyle Expenses</h5>
            <p>
              Between Adventures, you choose a particular quality of life and
              pay the cost of maintaining that lifestyle.
            </p>
            <p>
              Living a particular lifestyle doesn’t have a huge Effect on your
              character, but your lifestyle can affect the way other Individuals
              and Groups react to you. For example, when you lead an
              Aristocratic lifestyle, it might be easier for you to Influence
              the nobles of the city than if you live in poverty.
            </p>
            <h5>Downtime Activities</h5>
            <p>
              Between Adventures, the GM might ask you what your character is
              doing during his or her Downtime. Periods of Downtime can vary in
              Duration, but each Downtime activity requires a certain number of
              days to complete before you gain any benefit, and at least 8 hours
              of each day must be spent on the Downtime activity for the day to
              count. The days do not need to be consecutive. If you have more
              than the minimum amount of days to spend, you can keep doing the
              same thing for a longer period of time, or switch to a new
              Downtime activity.
            </p>
            <p>
              Downtime activities other than the ones presented below are
              possible. If you want your character to spend his or her Downtime
              performing an activity not covered here, discuss it with your GM.
            </p>
            <h5>Crafting</h5>
            <p>
              You can craft nonmagical Objects, including Adventuring Equipment
              and works of art. You must be proficient with tools related to the
              object you are trying to create (typically artisan’s tools). You
              might also need access to Special materials or locations necessary
              to create it. For example, someone proficient with smith’s tools
              needs a forge in order to craft a sword or suit of armor.
            </p>
            <p>
              For every day of Downtime you spend Crafting, you can craft one or
              more items with a total market value not exceeding 5 gp, and you
              must expend raw materials worth half the total market value. If
              something you want to craft has a market value greater than 5 gp,
              you make progress every day in 5- gp increments until you reach
              the market value of the item. For example, a suit of Plate Armor
              (market value 1,500 gp) takes 300 days to craft by yourself.
            </p>
            <p>
              Multiple Characters can combine their efforts toward the Crafting
              of a single item, provided that the Characters all have
              Proficiency with the requisite tools and are Working Together in
              the same place.
            </p>
            <p>
              Each character contributes 5 gp worth of effort for every day
              spent helping to craft the item. For example, three Characters
              with the requisite tool Proficiency and the proper facilities can
              craft a suit of Plate Armor in 100 days, at a total cost of 750
              gp.
            </p>
            <p>
              While Crafting, you can maintain a modest lifestyle without having
              to pay 1 gp per day, or a comfortable lifestyle at half the normal
              cost.
            </p>
            <h5>Practicing a Profession</h5>
            <p>
              You can work between Adventures, allowing you to maintain a modest
              lifestyle without having to pay 1 gp per day. This benefit lasts
              as long you continue to practice your profession.
            </p>
            <p>
              If you are a member of an organization that can provide gainful
              employment, such as a Temple or a thieves’ guild, you earn enough
              to support a comfortable lifestyle instead.
            </p>
            <p>
              If you have Proficiency in the Performance skill and put your
              Performance skill to use during your Downtime, you earn enough to
              support a wealthy lifestyle instead.
            </p>
            <h5>Recuperating</h5>
            <p>
              You can use Downtime between Adventures to recover from a
              debilitating injury, disease, or poison.
            </p>
            <p>
              After three days of Downtime spent Recuperating, you can make a DC
              15 Constitution saving throw. On a successful save, you can choose
              one of the following results:
            </p>
            <ul>
              <li>
                End one Effect on you that prevents you from regaining Hit
                Points.
              </li>
              <li>
                For the next 24 hours, gain advantage on Saving Throws against
                one disease or poison currently affecting you.
              </li>
            </ul>
            <h5>Researching</h5>
            <p>
              The time between Adventures is a great chance to perform Research,
              gaining Insight into Mysteries that have unfurled over the course
              of the campaign.
            </p>
            <p>
              Research can include poring over dusty tomes and crumbling Scrolls
              in a Library or buying drinks for the locals to pry rumors and
              gossip from their lips.
            </p>
            <p>
              When you begin your Research, the GM determines whether the
              information is available, how many days of Downtime it will take
              to find it, and whether there are any restrictions on your
              Research (such as needing to seek out a specific individual, tome,
              or location). The GM might also require you to make one or more
              Ability Checks, such as an Intelligence (Investigation) check to
              find clues pointing toward the information you seek, or a Charisma
              (Persuasion) check to secure someone’s aid. Once those Conditions
              are met, you learn the information if it is available.
            </p>
            <p>
              For each day of Research, you must spend 1 gp to cover your
              Expenses. This cost is in addition to your normal lifestyle
              Expenses.
            </p>
            <h5>Training</h5>
            <p>
              You can spend time between Adventures learning a new language or
              Training with a set of tools. Your GM might allow additional
              Training options.
            </p>
            <p>
              First, you must find an Instructor willing to teach you. The GM
              determines how long it takes, and whether one or more Ability
              Checks are required.
            </p>
            <p>
              The Training lasts for 250 days and costs 1 gp per day. After you
              spend the requisite amount of time and money, you learn the new
              language or gain Proficiency with the new tool.
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Resting;
