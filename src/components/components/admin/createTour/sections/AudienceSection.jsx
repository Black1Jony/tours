import { Form, Select, Row, Col } from "antd"
import { Section, SwitchField } from "../tourFormHelpers"
import { AUDIENCE_TYPES } from "../tourSchema"

const { Option } = Select

const AudienceSection = ({ formData, set }) => (
  <Section title="Audience">
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          label="Audience Types"
          name="audienceType"
          rules={[
            {
              type: "array",
              min: 1,
              message: "Select at least one audience type",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select audience types"
            value={formData.audience.type}
            onChange={(v) => set("audience.type", v)}
          >
            {AUDIENCE_TYPES.map((t) => (
              <Option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col xs={12} sm={6}>
        <SwitchField
          name="kidsAllowed"
          label="Kids Allowed"
          value={formData.audience.kidsAllowed}
          onChange={(v) => set("audience.kidsAllowed", v)}
        />
      </Col>

      <Col xs={12} sm={6}>
        <SwitchField
          name="petsAllowed"
          label="Pets Allowed"
          value={formData.audience.petsAllowed}
          onChange={(v) => set("audience.petsAllowed", v)}
        />
      </Col>
    </Row>
  </Section>
)

export default AudienceSection