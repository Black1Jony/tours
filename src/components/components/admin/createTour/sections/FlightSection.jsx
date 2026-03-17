import { Form, Input, Select, Row, Col } from "antd"
import { Section, SwitchField } from "../tourFormHelpers"
import { BAGGAGES } from "../tourSchema"

const { Option } = Select

const FlightSection = ({ formData, set }) => (
  <Section title="Flight">
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="From"
          name="flightFrom"
          rules={[{ required: true, message: "Departure city is required" }]}
        >
          <Input
            placeholder="Bishkek (FRU)"
            value={formData.flight.from}
            onChange={(e) => set("flight.from", e.target.value)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="To"
          name="flightTo"
          rules={[{ required: true, message: "Destination city is required" }]}
        >
          <Input
            placeholder="Istanbul (IST)"
            value={formData.flight.to}
            onChange={(e) => set("flight.to", e.target.value)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="Airline"
          name="airline"
          rules={[{ required: true, message: "Airline is required" }]}
        >
          <Input
            placeholder="Turkish Airlines"
            value={formData.flight.airline}
            onChange={(e) => set("flight.airline", e.target.value)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Form.Item label="Baggage" name="baggage">
          <Select
            placeholder="Select baggage option"
            value={formData.flight.baggage || undefined}
            onChange={(v) => set("flight.baggage", v)}
            allowClear
          >
            {BAGGAGES.map((b) => (
              <Option key={b} value={b}>
                {b}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col xs={12} sm={6}>
        <SwitchField
          name="directFlight"
          label="Direct Flight"
          value={formData.flight.direct}
          onChange={(v) => set("flight.direct", v)}
        />
      </Col>

      <Col xs={12} sm={6}>
        <SwitchField
          name="transferIncluded"
          label="Transfer Included"
          value={formData.flight.transferIncluded}
          onChange={(v) => set("flight.transferIncluded", v)}
        />
      </Col>
    </Row>
  </Section>
)

export default FlightSection