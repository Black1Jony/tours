import { Row, Col } from "antd"
import { Section, SwitchField } from "../tourFormHelpers"

const EXTRAS = [
  ["wifi",       "WiFi",                  "extras.wifi"],
  ["spa",        "Spa",                   "extras.spa"],
  ["pool",       "Pool",                  "extras.pool"],
  ["excursions", "Excursions Available",  "extras.excursionsAvailable"],
]

const ExtrasSection = ({ formData, set }) => (
  <Section title="Extras">
    <Row gutter={[16, 0]}>
      {EXTRAS.map(([name, label, path]) => (
        <Col key={name} xs={12} sm={6}>
          <SwitchField
            name={name}
            label={label}
            value={path.split(".").reduce((o, k) => o[k], formData)}
            onChange={(v) => set(path, v)}
          />
        </Col>
      ))}
    </Row>
  </Section>
)

export default ExtrasSection