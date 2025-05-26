import styles from "@/styles/SkillsComponent.module.css";
import {
  Code,
  Database,
  PaintBucket,
  Wand2,
  Layers,
  SlidersHorizontal,
} from "lucide-react";
import {skills} from "@/lib/skills"


const SkillsComponent = () => {
 

  const getCategoryIcon = (category: string | undefined) => {
    switch (category) {
      case "Frontend":
        return <PaintBucket className="w-4 h-4" />;
      case "Backend":
        return <Code className="w-4 h-4" />;
      case "Database":
        return <Database className="w-4 h-4" />;
      case "Design":
        return <Wand2 className="w-4 h-4" />;
      case "DevOps":
        return <SlidersHorizontal className="w-4 h-4" />;
      case "Tools":
        return <Layers className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div id="skills" className={styles.skills_container}>
      <h1 className={styles.skills_title}>My Skills</h1>
      <div className={styles.skill_items}>
        {skills.map((skill) => (
          <div className={styles.skill_item} key={skill.name}>
            <div className={styles.skill_name}>
              {getCategoryIcon(skill.category)}
              <span>{skill.name}</span>
            </div>

            <div className={styles.skill_category}>{skill.category}</div>
            <div className={styles.skill_level}>
              <div className={styles.skill_level_out}>
                <div className={styles[skill.level]}></div>
              </div>
              <div className={styles.skill_level_box}>
                 <p className={styles.skill_level_title}>{skill.level}</p>
              <span className={styles.skill_level_percent}>
                {skill.level === "basic" && "33%"}
                {skill.level === "medium" && "66%"}
                {skill.level === "advanced" && "90%"}
              </span>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsComponent;
