import { ArrowBackIos } from "@mui/icons-material";
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectRepository from "../repositories/ProjectRepository";
import styles from "./../style/pages/Delete.module.css";

export default function Claim(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteSuccessful, setDeleteSuccessful] = useState<boolean | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [projects, setProjects] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [project, setProject] = useState<string>("none");
  const [version, setVersion] = useState<string>("none");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    ProjectRepository.get().then((projects) => {
      setProjects(projects);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (project === "none") return;

    setLoading(true);
    ProjectRepository.getVersions(project).then((versions) => {
      setVersions(versions.map((v) => v.name));
      setLoading(false);
    });
  }, [project]);

  async function deleteDocumentation(): Promise<void> {
    if (!project || project === "none") return;
    if (!version || version === "none") return;
    if (!token) return;

    try {
      setLoading(true);

      await ProjectRepository.deleteDoc(project, version, token);

      setDeleteSuccessful(true);
      setErrorMsg("");
    } catch (e: any) {
      console.error(e);

      setErrorMsg(e.message);
      setDeleteSuccessful(false);

      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className={styles["loading-spinner"]}></div>;
  }

  return (
    <div className={styles["delete"]}>
      <Header />
      {errorMsg && <div className={styles["error-banner"]}>{errorMsg}</div>}
      {deleteSuccessful && (
        <div className={styles["success-banner"]}>
          Documentation deleted successfully
        </div>
      )}
      <div className={styles["delete-content"]}>
        <div className={styles["delete-header"]}>
          <Link to="/">
            <ArrowBackIos />
          </Link>
          <h1 className={styles["delete-title"]}>Delete Documentation</h1>
        </div>
        <FormGroup className={styles["delete-form"]}>
          <div className={styles["delete-form-group"]}>
            <InputLabel id="project-select-label">Project</InputLabel>
            <Select
              className={styles["project-select"]}
              id="project-select"
              label="Project"
              labelId="project-select-label"
              onChange={(e) => setProject(e.target.value)}
              value={project}
              defaultValue="none"
            >
              <MenuItem value="none" disabled>
                Select a project
              </MenuItem>
              {projects.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={styles["delete-form-group"]}>
            <InputLabel id="version-select-label">Version</InputLabel>
            <Select
              className={styles["version-select"]}
              label="Version"
              labelId="version-select-label"
              onChange={(e) => setVersion(e.target.value)}
              value={version}
              defaultValue="none"
            >
              <MenuItem value="none" disabled>
                Select a version
              </MenuItem>
              {versions.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className={styles["delete-form-group"]}>
            <InputLabel id="token-label">Token</InputLabel>
            <TextField
              className={styles["token-input"]}
              value={token}
            >
              {token}
            </TextField>
          </div>

          <button
            className={styles["delete-button"]}
            type="submit"
            onClick={deleteDocumentation}
          >
            Delete
          </button>
        </FormGroup>
      </div>
      <div className={styles["footer-container"]}>
        <Footer />
      </div>
    </div>
  );
}
