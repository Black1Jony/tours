import { Form, Select, Row, Col } from "antd"
import { Section, SwitchField } from "../tourFormHelpers"
import { MEAL_TYPES } from "../tourSchema"

const { Option } = Select

const INCLUDED_SWITCHES = [
  ["includedFlight",   "Flight",    "included.flight"],
  ["includedHotel",    "Hotel",     "included.hotel"],
  ["includedTransfer", "Transfer",  "included.transfer"],
  ["includedInsurance","Insurance", "included.insurance"],
  ["includedVisa",     "Visa",      "included.visa"],
  ["includedGuide",    "Guide",     "included.guide"],
]

const IncludedSection = ({ formData, set }) => (
  <Section title="Included in Tour">
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8}>
        <Form.Item label="Meals" name="meals">
          <Select
            placeholder="Select meal plan"
            value={formData.included.meals || undefined}
            onChange={(v) => set("included.meals", v)}
            allowClear
          >
            {MEAL_TYPES.map((m) => (
              <Option key={m} value={m}>
                {m}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 0]} wrap>
      {INCLUDED_SWITCHES.map(([name, label, path]) => (
        <Col key={name} xs={12} sm={8} md={4}>
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

export default IncludedSection