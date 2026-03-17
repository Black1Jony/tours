import { Form, Input, InputNumber, Row, Col } from "antd"
import { Section } from "../tourFormHelpers"

const { TextArea } = Input

const HotelSection = ({ formData, set }) => (
  <Section title="Hotel">
    <Row gutter={16}>
      <Col xs={24} sm={12} md={10}>
        <Form.Item
          label="Hotel Name"
          name="hotelName"
          rules={[{ required: true, message: "Hotel name is required" }]}
        >
          <Input
            placeholder="Grand Hyatt Istanbul"
            value={formData.hotel.name}
            onChange={(e) => set("hotel.name", e.target.value)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={4}>
        <Form.Item
          label="Stars"
          name="hotelStars"
          rules={[
            { required: true, message: "Required" },
            { type: "number", min: 1, max: 5, message: "1–5 stars" },
          ]}
        >
          <InputNumber
            min={1}
            max={5}
            style={{ width: "100%" }}
            placeholder="4"
            value={formData.hotel.stars}
            onChange={(v) => set("hotel.stars", v)}
          />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item
          label="Hotel Description"
          name="hotelDescription"
          rules={[
            { required: true, message: "Hotel description is required" },
            { min: 10, message: "At least 10 characters" },
            { max: 500, message: "Max 500 characters" },
          ]}
        >
          <TextArea
            rows={3}
            placeholder="Briefly describe the hotel facilities and highlights…"
            maxLength={500}
            showCount
            value={formData.hotel.description}
            onChange={(e) => set("hotel.description", e.target.value)}
          />
        </Form.Item>
      </Col>
    </Row>
  </Section>
)

export default HotelSection