import { Form, InputNumber, Row, Col } from "antd"
import { Section } from "../tourFormHelpers"

const DurationSection = ({ formData, set }) => (
  <Section title="Duration">
    <Row gutter={16}>
      <Col xs={12} sm={8} md={6}>
        <Form.Item
          label="Days"
          name="durationDays"
          rules={[
            { required: true, message: "Required" },
            { type: "number", min: 1, message: "Min 1 day" },
          ]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            value={formData.duration.days}
            onChange={(v) => set("duration.days", v)}
          />
        </Form.Item>
      </Col>

      <Col xs={12} sm={8} md={6}>
        <Form.Item
          label="Nights"
          name="durationNights"
          rules={[
            { required: true, message: "Required" },
            { type: "number", min: 0, message: "Min 0" },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            value={formData.duration.nights}
            onChange={(v) => set("duration.nights", v)}
          />
        </Form.Item>
      </Col>
    </Row>
  </Section>
)

export default DurationSection