import React from "react";
import { Container, ListGroup, Table } from "react-bootstrap";

const textStyle = { textAlign: "left" };

export const Environment = () => {
  return (
    <Container>
      <h3>Environment</h3>
      <div style={textStyle}>
        <ListGroup>
          <ListGroup.Item>
            <p>
              By its nature, adventuring involves delving into places that are
              dark, dangerous, and full of mysteries to be explored. The rules
              in this section cover some of the most important ways in which
              adventurers interact with the environment in such places.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Falling</h5>
            <p>
              A fall from a great height is one of the most common hazards
              facing an adventurer. At the end of a fall, a creature takes 1d6
              bludgeoning damage for every 10 feet it fell, to a maximum of
              20d6. The creature lands srd:prone, unless it avoids taking damage
              from the fall.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Suffocating</h5>
            <p>
              A creature can hold its breath for a number of minutes equal to 1
              + its Constitution modifier (minimum of 30 seconds)
            </p>
            <p>
              When a creature runs out of breath or is choking, it can survive
              for a number of rounds equal to its Constitution modifier (minimum
              of 1 round). At the start of its next turn, it drops to 0 hit
              points and is dying, and it can't regain hit points or be
              stabilized until it can breathe again.
            </p>
            <p>
              For example, a creature with a Constitution of 14 can hold its
              breath for 3 minutes. If it starts suffocating, it has 2 rounds to
              reach air before it drops to 0 hit points.
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

export default Environment;
