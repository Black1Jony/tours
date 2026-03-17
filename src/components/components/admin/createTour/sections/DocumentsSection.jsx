import { Form, InputNumber, Row, Col } from "antd"
import { Section, SwitchField } from "../tourFormHelpers"

const DocumentsSection = ({ formData, set }) => (
  <Section title="Documents">
    <Row gutter={16}>
      <Col xs={12} sm={8}>
        <SwitchField
          name="visaRequired"
          label="Visa Required"
          value={formData.documents.visaRequired}
          onChange={(v) => set("documents.visaRequired", v)}
        />
      </Col>

      <Col xs={12} sm={8}>
        <SwitchField
          name="insuranceIncluded"
          label="Insurance Included"
          value={formData.documents.insuranceIncluded}
          onChange={(v) => set("documents.insuranceIncluded", v)}
        />
      </Col>

      <Col xs={24} sm={8}>
        <Form.Item
          label="Passport Validity (months)"
          name="passportValidityMonths"
          rules={[
            { type: "number", min: 0, max: 120, message: "0–120 months" },
          ]}
        >
          <InputNumber
            min={0}
            max={120}
            style={{ width: "100%" }}
            value={formData.documents.passportValidityMonths}
            onChange={(v) => set("documents.passportValidityMonths", v)}
          />
        </Form.Item>
      </Col>
    </Row>
  </Section>
)

export default DocumentsSection