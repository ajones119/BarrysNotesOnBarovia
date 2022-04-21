import React from "react";
import { Container, ListGroup, Table } from "react-bootstrap";

const textStyle = { textAlign: "left" };

export const Conditions = () => {
  return (
    <Container>
      <h3>Conditions</h3>
      <div style={textStyle}>
        <ListGroup>
          <ListGroup.Item>
            <p>
              Conditions alter a creature's capabilities in a variety of ways
              and can arise as a result of a spell, a class feature, a monster's
              attack, or other effect. Most conditions, such as srd:blinded, are
              impairments, but a few, such as srd:invisible, can be
              advantageous.
            </p>
            <p>
              A condition lasts either until it is countered (the srd:prone
              condition is countered by standing up, for example) or for a
              duration specified by the effect that imposed the condition.
            </p>
            <p>
              If multiple effects impose the same condition on a creature, each
              instance of the condition has its own duration, but the
              condition's effects don't get worse. A creature either has a
              condition or doesn't.
            </p>
            <p>
              The following definitions specify what happens to a creature while
              it is subjected to a condition.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Blinded</h5>
            <ul>
              <li>
                A blinded creature can't see and automatically fails any ability
                check that requires sight.
              </li>
              <li>
                Attack rolls against the creature have advantage, and the
                creature's attack rolls have disadvantage.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Charmed</h5>
            <ul>
              <li>
                A charmed creature can't attack the charmer or target the
                charmer with harmful abilities or magical effects.
              </li>
              <li>
                The charmer has advantage on any ability check to interact
                socially with the creature.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Exhausted</h5>
            <p>
              Some special abilities and environmental hazards, such as
              starvation and the long---term effects of freezing or scorching
              temperatures, can lead to a special condition called exhaustion.
              Exhaustion is measured in six levels. An effect can give a
              creature one or more levels of exhaustion, as specified in the
              effect's description.
            </p>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Disadvantage on ability checks</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Speed halved</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Disadvantage on attack rolls and saving throws</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Hit point maximum halved</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Speed reduced to 0</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Death</td>
                </tr>
              </tbody>
            </Table>
            <p>
              If an already exhausted creature suffers another effect that
              causes exhaustion, its current level of exhaustion increases by
              the amount specified in the effect's description.
            </p>
            <p>
              A creature suffers the effect of its current level of exhaustion
              as well as all lower levels. For example, a creature suffering
              level 2 exhaustion has its speed halved and has disadvantage on
              ability checks.
            </p>
            <p>
              An effect that removes exhaustion reduces its level as specified
              in the effect's description, with all exhaustion effects ending if
              a creature's exhaustion level is reduced below 1.
            </p>
            <p>
              Finishing a long rest reduces a creature's exhaustion level by 1,
              provided that the creature has also ingested some food and drink.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Frightened</h5>
            <ul>
              <li>
                A frightened creature has disadvantage on ability checks and
                attack rolls while the source of its fear is within line of
                sight.
              </li>
              <li>
                The creature can't willingly move closer to the source of its
                fear.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Grappled</h5>
            <ul>
              <li>
                A grappled creature's speed becomes 0, and it can't benefit from
                any bonus to its speed.
              </li>
              <li>
                The condition ends if the grappler is srd:incapacitated (see the
                condition).
              </li>
              <li>
                The condition also ends if an effect removes the grappled
                creature from the reach of the grappler or grappling effect,
                such as when a creature is hurled away by the srd:thunderwave
                spell.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Incapacitated</h5>
            <ul>
              <li>
                An incapacitated creature can't take actions or reactions.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Invisible</h5>
            <ul>
              <li>
                An invisible creature is impossible to see without the aid of
                magic or a special sense. For the purpose of hiding, the
                creature is heavily obscured. The creature's location can be
                detected by any noise it makes or any tracks it leaves.
              </li>
              <li>
                Attack rolls against the creature have disadvantage, and the
                creature's attack rolls have advantage.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Paralyzed</h5>
            <ul>
              <li>
                A paralyzed creature is srd:incapacitated and can't move or
                speak.
              </li>
              <li>
                The creature automatically fails Strength and Dexterity saving
                throws
              </li>
              <li>Attack rolls against the creature have advantage.</li>
              <li>
                Any attack that hits the creature is a critical hit if the
                attacker is within 5 feet of the creature.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Petrified</h5>
            <ul>
              <li>
                A petrified creature is transformed, along with any nonmagical
                object it is wearing or carrying, into a solid inanimate
                substance (usually stone). Its weight increases by a factor of
                ten, and it ceases aging.
              </li>
              <li>
                The creature is srd:incapacitated, can't move or speak, and is
                unaware of its surroundings.
              </li>
              <li>Attack rolls against the creature have advantage.</li>
              <li>
                The creature automatically fails Strength and Dexterity saving
                throws
              </li>
              <li>The creature has resistance to all damage.</li>
              <li>
                The creature is immune to poison and disease, although a poison
                or disease already in its system is suspended, not neutralized.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Poisoned</h5>
            <ul>
              <li>
                A poisoned creature has disadvantage on attack rolls and ability
                checks.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Prone</h5>
            <ul>
              <li>
                A prone creature's only movement option is to crawl, unless it
                stands up and thereby ends the condition.
              </li>
              <li>The creature has disadvantage on attack rolls.</li>
              <li>
                An attack roll against the creature has advantage if the
                attacker is within 5 feet of the creature. Otherwise, the attack
                roll has disadvantage.
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Restrained</h5>
            <ul>
              <li>
                A restrained creature's speed becomes 0, and it can't benefit
                from any bonus to its speed.
              </li>
              <li>
                Attack rolls against the creature have advantage, and the
                creature's attack rolls have disadvantage.
              </li>
              <li>The creature has disadvantage on Dexterity saving throws.</li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Stunned</h5>
            <ul>
              <li>
                A stunned creature is srd:incapacitated, can't move, and can
                speak only falteringly.
              </li>
              <li>
                The creature automatically fails Strength and Dexterity saving
                throws.
              </li>
              <li>Attack rolls against the creature have advantage.</li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Unconscious</h5>
            <ul>
              <li>
                An unconscious creature is srd:incapacitated, can't move or
                speak, and is unaware of its surroundings
              </li>
              <li>
                The creature drops whatever it's holding and falls srd:prone.
              </li>
              <li>
                The creature automatically fails Strength and Dexterity saving
                throws.
              </li>
              <li>Attack rolls against the creature have advantage.</li>
              <li>
                Any attack that hits the creature is a critical hit if the
                attacker is within 5 feet of the creature.
              </li>
            </ul>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Conditions;
