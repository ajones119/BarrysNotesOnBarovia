import React from "react";
import { Container, ListGroup, Table } from "react-bootstrap";

const textStyle = { textAlign: "left" };

export const Weapons = () => {
  return (
    <Container>
      <h3>Weapons</h3>
      <div style={textStyle}>
        <ListGroup>
          <ListGroup.Item>
            <p>
              Your class grants Proficiency in certain Weapons, reflecting both
              the class’s focus and the tools you are most likely to use.
              Whether you favor a Longsword or a Longbow, your weapon and your
              ability to wield it effectively can mean the difference between
              life and death while Adventuring.
            </p>
            <p>
              The Weapons table shows the most Common Weapons used in the
              fantasy gaming worlds, their price and weight, the damage they
              deal when they hit, and any special Properties they possess. Every
              weapon is classified as either melee or ranged. A melee weapon is
              used to Attack a target within 5 feet of you, whereas a ranged
              weapon is used to Attack a target at a distance.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Weapon Proficiency</h5>
            <p>
              Your race, class, and feats can grant you Proficiency with certain
              Weapons or categories of Weapons. The two categories are simple
              and martial. Most people can use simple Weapons with Proficiency.
              These Weapons include clubs, maces, and other Weapons often found
              in the hands of commoners. Martial Weapons, including Swords,
              axes, and polearms, require more specialized Training to use
              effectively. Most warriors use martial Weapons because these
              Weapons put their Fighting style and Training to best use.
            </p>
            <p>
              Proficiency with a weapon allows you to add your Proficiency bonus
              to the Attack roll for any Attack you make with that weapon. If
              you make an Attack roll using a weapon with which you lack
              Proficiency, you do not add your Proficiency bonus to the Attack
              roll.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Weapon Properties</h5>
            <p>
              Many Weapons have special Properties related to their use, as
              shown in the Weapons table.
            </p>
            <h5>Ammunition</h5>
            <p>
              You can use a weapon that has the Ammunition property to make a
              ranged Attack only if you have Ammunition to fire from the weapon.
              Each time you Attack with the weapon, you expend one piece of
              Ammunition. Drawing the Ammunition from a Quiver, case, or other
              container is part of the Attack (you need a free hand to load a
              one-handed weapon). At the end of the battle, you can recover half
              your expended Ammunition by taking a minute to Search the
              battlefield. If you use a weapon that has the Ammunition property
              to make a melee Attack, you treat the weapon as an Improvised
              Weapon (see “Improvised Weapons” later in the section). A sling
              must be loaded to deal any damage when used in this way.
            </p>
            <h5>Finesse</h5>
            <p>
              When making an Attack with a finesse weapon, you use your choice
              of your Strength or Dexterity modifier for the Attack and Damage
              Rolls. You must use the same modifier for both rolls.
            </p>
            <h5>Heavy</h5>
            <p>
              Small Creatures have disadvantage on Attack rolls with heavy
              Weapons. A heavy weapon’s size and bulk make it too large for a
              Small creature to use effectively.
            </p>
            <h5>Light</h5>
            <p>
              A light weapon is small and easy to handle, making it ideal for
              use when Fighting with two Weapons.
            </p>
            <h5>Loading</h5>
            <p>
              Because of the time required to load this weapon, you can fire
              only one piece of Ammunition from it when you use an Action, bonus
              Action, or Reaction to fire it, regardless of the number of
              attacks you can normally make.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Vision and Light</h5>
            <p>
              The most fundamental tasks of adventuring---noticing danger,
              finding hidden objects, hitting an enemy in combat, and targeting
              a spell, to name just a few---rely heavily on a character's
              ability to see. Darkness and other effects that obscure vision can
              prove a significant hindrance.
            </p>
            <p>
              A given area might be lightly or heavily obscured. In a **lightly
              obscured** area, such as dim light, patchy fog, or moderate
              foliage, creatures have disadvantage on Wisdom (Perception) checks
              that rely on sight.
            </p>
            <p>
              A <b>heavily obscured</b> area---such as darkness, opaque fog, or
              dense foliage---blocks vision entirely. A creature effectively
              suffers from the srd:blinded condition when trying to see
              something in that area.
            </p>
            <p>
              The presence or absence of light in an environment creates three
              categories of illumination: bright light, dim light, and darkness.
            </p>
            <p>
              <b>Bright light</b> lets most creatures see normally. Even gloomy
              days provide bright light, as do torches, lanterns, fires, and
              other sources of illumination within a specific radius.
            </p>
            <p>
              <b>Dim light</b>, also called shadows, creates a lightly obscured
              area. An area of dim light is usually a boundary between a source
              of bright light, such as a torch, and surrounding darkness. The
              soft light of twilight and dawn also counts as dim light. A
              particularly brilliant full moon might bathe the land in dim
              light.
            </p>
            <p>
              <b>Darkness</b> creates a heavily obscured area. Characters face
              darkness outdoors at night (even most moonlit nights), within the
              confines of an unlit dungeon or a subterranean vault, or in an
              area of magical darkness.
            </p>
            <h5>Blindsight</h5>
            <p>
              A creature with blindsight can perceive its surroundings without
              relying on sight, within a specific radius. Creatures without
              eyes, such as oozes, and creatures with echolocation or heightened
              senses, such as bats and true dragons, have this sense.
            </p>
            <h5>Darkvision</h5>
            <p>
              Many creatures in fantasy gaming worlds, especially those that
              dwell underground, have darkvision. Within a specified range, a
              creature with darkvision can see in darkness as if the darkness
              were dim light, so areas of darkness are only lightly obscured as
              far as that creature is concerned. However, the creature can't
              discern color in darkness, only shades of gray.
            </p>
            <h5>Truesight</h5>
            <p>
              A creature with truesight can, out to a specific range, see in
              normal and magical darkness, see srd:invisible creatures and
              objects, automatically detect visual illusions and succeed on
              saving throws against them, and perceives the original form of a
              shapechanger or a creature that is transformed by magic.
              Furthermore, the creature can see into the Ethereal Plane.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Food and Water</h5>
            <p>
              Characters who don't eat or drink suffer the effects of
              srd:exhaustion. Exhaustion caused by lack of food or water can't
              be removed until the character eats and drinks the full required
              amount.
            </p>
            <h5>Food</h5>
            <p>
              A character needs one pound of food per day and can make food last
              longer by subsisting on half rations. Eating half a pound of food
              in a day counts as half a day without food.
            </p>
            <p>
              A character can go without food for a number of days equal to 3 +
              his or her Constitution modifier (minimum 1). At the end of each
              day beyond that limit, a character automatically suffers one level
              of srd:exhaustion.
            </p>
            <p>
              A normal day of eating resets the count of days without food to
              zero.
            </p>
            <h5>Water</h5>
            <p>
              A character needs one gallon of water per day, or two gallons per
              day if the weather is hot. A character who drinks only half that
              much water must succeed on a DC 15 Constitution saving throw or
              suffer one level of srd:exhaustion at the end of the day. A
              character with access to even less water automatically suffers one
              level of srd:exhaustion at the end of the day.
            </p>
            <p>
              If the character already has one or more levels of srd:exhaustion,
              the character takes two levels in either case.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Interacting With Objects</h5>
            <p>
              A character's interaction with objects in an environment is often
              simple to resolve in the game. The player tells the GM that his or
              her character is doing something, such as moving a lever, and the
              GM describes what, if anything, happens.
            </p>
            <p>
              For example, a character might decide to pull a lever, which
              might, in turn, raise a portcullis, cause a room to flood with
              water, or open a secret door in a nearby wall. If the lever is
              rusted in position, though, a character might need to force it. In
              such a situation, the GM might call for a Strength check to see
              whether the character can wrench the lever into place. The GM sets
              the DC for any such check based on the difficulty of the task.
            </p>
            <p>
              Characters can also damage objects with their weapons and spells.
              Objects are immune to poison and psychic damage, but otherwise
              they can be affected by physical and magical attacks much like
              creatures can. The GM determines an object's Armor Class and hit
              points, and might decide that certain objects have resistance or
              immunity to certain kinds of attacks. (It's hard to cut a rope
              with a club, for example.) Objects always fail Strength and
              Dexterity saving throws, and they are immune to effects that
              require other saves. When an object drops to 0 hit points, it
              breaks.
            </p>
            <p>
              A character can also attempt a Strength check to break an object.
              The GM sets the DC for any such check.
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Weapons;
